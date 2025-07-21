import crypto from 'crypto';

export interface ResetCode {
  code: string;
  expiresAt: Date;
  email: string;
}

// In-memory storage for reset codes (in production, use Redis or database)
const resetCodes = new Map<string, ResetCode>();

export class EmailService {
  private static isDevelopment = process.env.NODE_ENV === 'development' || !process.env.EMAIL_USER;

  static generateResetCode(): string {
    // Generate a 6-digit numeric code
    return crypto.randomInt(100000, 999999).toString();
  }

  static async sendResetCode(email: string): Promise<string> {
    const code = this.generateResetCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store the code
    resetCodes.set(email, {
      code,
      expiresAt,
      email,
    });

    if (this.isDevelopment) {
      // In development, just log the code to console
      console.log('🔐 DEVELOPMENT MODE: Password reset code for', email, 'is:', code);
      console.log('📧 In production, this code would be sent via email');
      return code;
    } else {
      // In production, send actual email
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Admin Password Reset Code',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Password Reset Request</h2>
              <p>You requested a password reset for your admin account.</p>
              <p>Your verification code is:</p>
              <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
                <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${code}</h1>
              </div>
              <p><strong>This code will expire in 15 minutes.</strong></p>
              <p>If you didn't request this reset, please ignore this email.</p>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px;">
                This is an automated message from your portfolio admin system.
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        return code;
      } catch (error) {
        console.error('Email sending failed:', error);
        resetCodes.delete(email);
        throw new Error('Failed to send reset code');
      }
    }
  }

  static verifyResetCode(email: string, code: string): boolean {
    const storedCode = resetCodes.get(email);
    
    if (!storedCode) {
      return false;
    }

    // Check if code is expired
    if (new Date() > storedCode.expiresAt) {
      resetCodes.delete(email);
      return false;
    }

    // Check if code matches
    if (storedCode.code !== code) {
      return false;
    }

    // Code is valid, remove it to prevent reuse
    resetCodes.delete(email);
    return true;
  }

  static cleanupExpiredCodes(): void {
    const now = new Date();
    for (const [email, resetCode] of resetCodes.entries()) {
      if (now > resetCode.expiresAt) {
        resetCodes.delete(email);
      }
    }
  }
} 