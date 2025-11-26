import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class AuthService {
  static generateToken(user: any): string {
    const payload = {
      id: user.id,
      email: user.email,
      is_admin: user.is_admin,
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'default-secret', {
      expiresIn: '7d',
    });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
    } catch (error) {
      return null;
    }
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}