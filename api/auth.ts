import { VercelRequest, VercelResponse } from '@vercel/node';
import { AuthService } from '../lib/auth.js';
import { DatabaseService } from '../lib/database.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Verify token and get user info
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
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }

        // Admin login only
        const adminUser = await DatabaseService.getUserByEmail(email);
        if (!adminUser || !adminUser.is_admin) {
          return res.status(401).json({ error: 'Invalid admin credentials' });
        }

        // For admin users, verify password
        if (adminUser.password_hash) {
          const isValidPassword = await AuthService.comparePassword(password, adminUser.password_hash);
          if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid admin credentials' });
          }
        } else {
          return res.status(401).json({ error: 'Admin password not set' });
        }

        // Generate JWT token
        const authToken = AuthService.generateToken(adminUser);

        res.status(200).json({
          user: {
            id: adminUser.id,
            email: adminUser.email,
            name: adminUser.name,
            image_url: adminUser.image_url,
            is_admin: adminUser.is_admin,
          },
          token: authToken,
        });
        break;

      case 'PATCH':
        // Change admin password - need to verify token first
        const patchAuthHeader = req.headers.authorization;
        if (!patchAuthHeader) {
          return res.status(401).json({ error: 'Authorization header required' });
        }

        const patchToken = patchAuthHeader.replace('Bearer ', '');
        const patchPayload = AuthService.verifyToken(patchToken);
        
        if (!patchPayload) {
          return res.status(401).json({ error: 'Invalid token' });
        }

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
          return res.status(400).json({ error: 'Current password and new password are required' });
        }

        if (newPassword.length < 8) {
          return res.status(400).json({ error: 'New password must be at least 8 characters long' });
        }

        // Get the current user
        const currentUser = await DatabaseService.getUserByEmail(patchPayload.email);
        if (!currentUser || !currentUser.is_admin) {
          return res.status(401).json({ error: 'Admin user not found' });
        }

        // Verify current password
        if (currentUser.password_hash) {
          const isCurrentPasswordValid = await AuthService.comparePassword(currentPassword, currentUser.password_hash);
          if (!isCurrentPasswordValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
          }
        } else {
          return res.status(401).json({ error: 'No password set for admin user' });
        }

        // Hash the new password
        const newPasswordHash = await AuthService.hashPassword(newPassword);

        // Update password in database
        await DatabaseService.updateUserPassword(currentUser.id, newPasswordHash);

        res.status(200).json({ message: 'Password updated successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'OPTIONS']);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('Auth API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}