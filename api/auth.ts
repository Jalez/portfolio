import { VercelRequest, VercelResponse } from '@vercel/node';
import { DatabaseService } from '../lib/database';
import { AuthService, OAuthService } from '../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        const { provider } = req.query;
        
        if (provider === 'urls') {
          // Get OAuth URLs
          const urls = {
            google: OAuthService.getGoogleAuthUrl(),
            facebook: OAuthService.getFacebookAuthUrl(),
          };
          res.status(200).json(urls);
          break;
        }

        // Verify token
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json({ error: 'Authorization header required' });
        }

        const token = authHeader.replace('Bearer ', '');
        const payload = AuthService.verifyToken(token);
        
        if (!payload) {
          return res.status(401).json({ error: 'Invalid token' });
        }

        const user = await DatabaseService.getUserByEmail(payload.email);
        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }

        res.status(200).json({
          id: user.id,
          email: user.email,
          name: user.name,
          image_url: user.image_url,
          is_admin: user.is_admin,
        });
        break;

      case 'POST':
        const { type, code, email } = req.body;

        if (type === 'google') {
          // Exchange code for access token
          const tokenResponse = await OAuthService.exchangeGoogleCode(code);
          if (tokenResponse.error) {
            throw new Error(`Google OAuth error: ${tokenResponse.error_description}`);
          }

          // Get user info from Google
          const userInfo = await OAuthService.getGoogleUserInfo(tokenResponse.access_token);
          
          // Check if user exists
          let user = await DatabaseService.getUserByProvider('google', userInfo.id);
          
          if (!user) {
            // Check if user exists with same email but different provider
            const existingUser = await DatabaseService.getUserByEmail(userInfo.email);
            if (existingUser) {
              throw new Error('An account with this email already exists with a different login method');
            }

            // Create new user
            user = await DatabaseService.createUser({
              email: userInfo.email,
              name: userInfo.name,
              image_url: userInfo.picture,
              provider: 'google',
              provider_id: userInfo.id,
            });
          }

          // Generate JWT token
          const token = AuthService.generateToken(user);

          res.status(200).json({
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              image_url: user.image_url,
              is_admin: user.is_admin,
            },
            token,
          });

        } else if (type === 'facebook') {
          // Exchange code for access token
          const tokenResponse = await OAuthService.exchangeFacebookCode(code);
          if (tokenResponse.error) {
            throw new Error(`Facebook OAuth error: ${tokenResponse.error.message}`);
          }

          // Get user info from Facebook
          const userInfo = await OAuthService.getFacebookUserInfo(tokenResponse.access_token);
          
          // Check if user exists
          let user = await DatabaseService.getUserByProvider('facebook', userInfo.id);
          
          if (!user) {
            // Check if user exists with same email but different provider
            const existingUser = await DatabaseService.getUserByEmail(userInfo.email);
            if (existingUser) {
              throw new Error('An account with this email already exists with a different login method');
            }

            // Create new user
            user = await DatabaseService.createUser({
              email: userInfo.email,
              name: userInfo.name,
              image_url: userInfo.picture?.data?.url,
              provider: 'facebook',
              provider_id: userInfo.id,
            });
          }

          // Generate JWT token
          const token = AuthService.generateToken(user);

          res.status(200).json({
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              image_url: user.image_url,
              is_admin: user.is_admin,
            },
            token,
          });

        } else if (type === 'admin') {
          const { password } = req.body;
          
          if (!email || !password) {
            throw new Error('Email and password are required for admin login');
          }

          const user = await DatabaseService.getUserByEmail(email);
          if (!user || !user.is_admin || !user.password_hash) {
            throw new Error('Invalid admin credentials');
          }

          // Verify password
          const isValidPassword = await AuthService.comparePassword(password, user.password_hash);
          if (!isValidPassword) {
            throw new Error('Invalid admin credentials');
          }

          const token = AuthService.generateToken(user);

          res.status(200).json({
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              image_url: user.image_url,
              is_admin: user.is_admin,
            },
            token,
          });
        } else {
          res.status(400).json({ error: 'Invalid auth type' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Auth API error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}