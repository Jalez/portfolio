import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from './database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  image_url?: string;
  is_admin: boolean;
}

export interface JWTPayload {
  userId: number;
  email: string;
  isAdmin: boolean;
}

export class AuthService {
  static generateToken(user: User): string {
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      isAdmin: user.is_admin,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return null;
    }
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static extractTokenFromRequest(authHeader?: string): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }
}

// Google OAuth configuration
export const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5173/auth/google/callback',
  scope: 'openid email profile',
};

// Facebook OAuth configuration
export const FACEBOOK_OAUTH_CONFIG = {
  clientId: process.env.FACEBOOK_CLIENT_ID!,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  redirectUri: process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:5173/auth/facebook/callback',
  scope: 'email',
};

export class OAuthService {
  static getGoogleAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
      response_type: 'code',
      scope: GOOGLE_OAUTH_CONFIG.scope,
      access_type: 'offline',
      prompt: 'consent',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  static getFacebookAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: FACEBOOK_OAUTH_CONFIG.clientId,
      redirect_uri: FACEBOOK_OAUTH_CONFIG.redirectUri,
      scope: FACEBOOK_OAUTH_CONFIG.scope,
      response_type: 'code',
    });

    return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
  }

  static async exchangeGoogleCode(code: string): Promise<any> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: GOOGLE_OAUTH_CONFIG.clientId,
        client_secret: GOOGLE_OAUTH_CONFIG.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
      }),
    });

    return response.json();
  }

  static async getGoogleUserInfo(accessToken: string): Promise<any> {
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
    return response.json();
  }

  static async exchangeFacebookCode(code: string): Promise<any> {
    const response = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?` +
      `client_id=${FACEBOOK_OAUTH_CONFIG.clientId}&` +
      `client_secret=${FACEBOOK_OAUTH_CONFIG.clientSecret}&` +
      `redirect_uri=${FACEBOOK_OAUTH_CONFIG.redirectUri}&` +
      `code=${code}`
    );

    return response.json();
  }

  static async getFacebookUserInfo(accessToken: string): Promise<any> {
    const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`);
    return response.json();
  }
}