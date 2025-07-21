import crypto from 'crypto';

export interface ResetCode {
  code: string;
  expiresAt: Date;
  email: string;
}

// In-memory storage for reset codes (in production, use Redis or database)
const resetCodes = new Map<string, ResetCode>();

export class EmailService {
  private static isDevelopment = process.env.NODE_ENV === 'development' || !process.env.SENDGRID_API_KEY;

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
      // In production, send actual email via SendGrid
      try {
        const sgMail = await import('@sendgrid/mail');
        const apiKey = process.env.SENDGRID_API_KEY;
        if (!apiKey) {
          throw new Error('SendGrid API key not configured');
        }
        sgMail.default.setApiKey(apiKey);

        const msg = {
          to: email,
          from: 'jaakko.rajala@tuni.fi', // Must be verified in SendGrid
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

        await sgMail.default.send(msg);
        return code;
      } catch (error) {
        console.error('SendGrid email sending failed:', error);
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

  static async sendTestimonialNotification(testimonialData: {
    name: string;
    quote: string;
    title?: string;
    company?: string;
    imageUrl?: string;
  }): Promise<void> {
    const adminEmail = 'jaakko.rajala@tuni.fi'; // Your email address

    if (this.isDevelopment) {
      // In development, just log the notification
      console.log('📧 DEVELOPMENT MODE: New testimonial notification');
      console.log('From:', testimonialData.name);
      console.log('Title:', testimonialData.title || 'N/A');
      console.log('Company:', testimonialData.company || 'N/A');
      console.log('Quote:', testimonialData.quote.substring(0, 100) + '...');
      console.log('📧 In production, this notification would be sent via email');
      return;
    } else {
      // In production, send actual email via SendGrid
      try {
        const sgMail = await import('@sendgrid/mail');
        const apiKey = process.env.SENDGRID_API_KEY;
        if (!apiKey) {
          throw new Error('SendGrid API key not configured');
        }
        sgMail.default.setApiKey(apiKey);

        const msg = {
          to: adminEmail,
          from: 'jaakko.rajala@tuni.fi', // Must be verified in SendGrid
          subject: 'New Testimonial Submitted - Portfolio',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">New Testimonial Submitted</h2>
              <p>Someone has submitted a new testimonial for your portfolio!</p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #007bff; margin-top: 0;">From: ${testimonialData.name}</h3>
                ${testimonialData.title ? `<p><strong>Title:</strong> ${testimonialData.title}</p>` : ''}
                ${testimonialData.company ? `<p><strong>Company:</strong> ${testimonialData.company}</p>` : ''}
                <p><strong>Quote:</strong></p>
                <blockquote style="border-left: 4px solid #007bff; padding-left: 15px; margin: 15px 0; font-style: italic;">
                  "${testimonialData.quote}"
                </blockquote>
              </div>
              
              <p><strong>Action Required:</strong> Please log into your admin panel to review and approve this testimonial.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://jaakkorajala.vercel.app/admin" 
                   style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Go to Admin Panel
                </a>
              </div>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px;">
                This is an automated notification from your portfolio testimonial system.
              </p>
            </div>
          `,
        };

        await sgMail.default.send(msg);
        console.log('Testimonial notification sent successfully');
      } catch (error) {
        console.error('SendGrid testimonial notification failed:', error);
        // Don't throw error to avoid breaking testimonial submission
        // Just log it so we know there was an issue
      }
    }
  }
} 