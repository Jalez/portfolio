import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-app.vercel.app' 
  : 'http://localhost:5173';

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    name: string;
    image_url?: string;
    is_admin: boolean;
  };
  token: string;
}

export class AuthAPI {
  // Handle Google OAuth callback
  static async handleGoogleCallback(code: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth`, {
        type: 'google',
        code,
      });
      return response.data;
    } catch (error) {
      console.error('Google OAuth error:', error);
      throw new Error('Failed to authenticate with Google');
    }
  }

  // Handle Facebook OAuth callback
  static async handleFacebookCallback(code: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth`, {
        type: 'facebook',
        code,
      });
      return response.data;
    } catch (error) {
      console.error('Facebook OAuth error:', error);
      throw new Error('Failed to authenticate with Facebook');
    }
  }

  // Verify token and get user info
  static async verifyToken(token: string): Promise<AuthResponse['user'] | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      return null;
    }
  }

  // Admin login (for direct admin access)
  static async adminLogin(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth`, {
        type: 'admin',
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Admin login error:', error);
      throw new Error('Failed to authenticate admin');
    }
  }

  // Get OAuth URLs
  static async getOAuthUrls() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth?provider=urls`);
      return response.data;
    } catch (error) {
      console.error('Error fetching OAuth URLs:', error);
      // Fallback URLs for development
      return {
        google: 'https://accounts.google.com/o/oauth2/v2/auth',
        facebook: 'https://www.facebook.com/v18.0/dialog/oauth',
      };
    }
  }
}