import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { DatabaseService } from '@/lib/database';
import { EmailService } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const payload = AuthService.verifyToken(token);

    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = await DatabaseService.getUserByEmail(payload.email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      image_url: user.image_url,
      is_admin: user.is_admin,
    });
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Admin login only
    const adminUser = await DatabaseService.getUserByEmail(email);
    if (!adminUser || !adminUser.is_admin) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    // For admin users, verify password
    if (adminUser.password_hash) {
      const isValidPassword = await AuthService.comparePassword(password, adminUser.password_hash);
      if (!isValidPassword) {
        return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
      }
    } else {
      return NextResponse.json({ error: 'Admin password not set' }, { status: 401 });
    }

    // Generate JWT token
    const authToken = AuthService.generateToken(adminUser);

    return NextResponse.json({
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        image_url: adminUser.image_url,
        is_admin: adminUser.is_admin,
      },
      token: authToken,
    });
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const payload = AuthService.verifyToken(token);

    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters long' }, { status: 400 });
    }

    // Get the current user
    const currentUser = await DatabaseService.getUserByEmail(payload.email);
    if (!currentUser || !currentUser.is_admin) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 401 });
    }

    // Verify current password
    if (currentUser.password_hash) {
      const isCurrentPasswordValid = await AuthService.comparePassword(currentPassword, currentUser.password_hash);
      if (!isCurrentPasswordValid) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
      }
    } else {
      return NextResponse.json({ error: 'No password set for admin user' }, { status: 401 });
    }

    // Hash the new password
    const changePasswordHash = await AuthService.hashPassword(newPassword);

    // Update password in database
    await DatabaseService.updateUserPassword(currentUser.id, changePasswordHash);

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { requestEmail } = await request.json();

    console.log('Password reset request for email:', requestEmail);

    if (!requestEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Only allow reset for admin users
    const requestUser = await DatabaseService.getUserByEmail(requestEmail);
    console.log('User found:', requestUser ? 'yes' : 'no', 'is_admin:', requestUser?.is_admin);

    if (!requestUser || !requestUser.is_admin) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 401 });
    }

    try {
      // Send reset code via email
      console.log('Attempting to send reset code...');
      await EmailService.sendResetCode(requestEmail);
      console.log('Reset code sent successfully');
      return NextResponse.json({ message: 'Reset code sent to your email' });
    } catch (error) {
      console.error('Failed to send reset code:', error);
      return NextResponse.json(
        { error: 'Failed to send reset code', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { resetEmail, resetCode, resetPassword } = await request.json();

    if (!resetEmail || !resetCode || !resetPassword) {
      return NextResponse.json({ error: 'Email, verification code, and new password are required' }, { status: 400 });
    }

    if (resetPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    // Verify the reset code
    if (!EmailService.verifyResetCode(resetEmail, resetCode)) {
      return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 401 });
    }

    // Only allow reset for admin users
    const resetUser = await DatabaseService.getUserByEmail(resetEmail);
    if (!resetUser || !resetUser.is_admin) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 401 });
    }

    // Hash the new password
    const finalPasswordHash = await AuthService.hashPassword(resetPassword);

    // Update password in database
    await DatabaseService.updateUserPassword(resetUser.id, finalPasswordHash);

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
