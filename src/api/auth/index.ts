import axios from 'axios';

const API_BASE_URL = '';

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
  // Verify token and get user info
  static async verifyToken(token: string): Promise<AuthResponse['user'] | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Admin login error:', error);
      throw new Error('Failed to authenticate admin');
    }
  }

  // Change admin password
  static async changePassword(currentPassword: string, newPassword: string, token: string): Promise<void> {
    try {
      await axios.patch(`${API_BASE_URL}/api/auth`, {
        currentPassword,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Password change error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to change password');
    }
  }

  // Request password reset code
  static async requestResetCode(email: string): Promise<void> {
    try {
      await axios.put(`${API_BASE_URL}/api/auth`, {
        requestEmail: email,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Request reset code error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to request reset code');
    }
  }

  // Reset password with verification code
  static async resetPasswordWithCode(email: string, code: string, newPassword: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/api/auth`, {
        data: {
          resetEmail: email,
          resetCode: code,
          resetPassword: newPassword,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to reset password');
    }
  }
}
