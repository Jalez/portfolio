import React, { useState } from 'react';
import { AuthAPI } from '../../api/auth/index';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('jaakko.rajala@tuni.fi'); // Pre-filled with admin email
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter the admin email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await AuthAPI.requestResetCode(email);
      setCodeSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    if (!newPassword.trim()) {
      setError('Please enter a new password');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await AuthAPI.resetPasswordWithCode(email, verificationCode, newPassword);
      setSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setVerificationCode('');
    } catch (err) {
      console.error('Password reset error:', err);
      if (err instanceof Error) {
        if (err.message.includes('401')) {
          setError('Invalid or expired verification code. Please request a new code.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to reset password');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-background">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-theme-primary mb-4">Password Reset Successful!</h2>
            <p className="text-theme-secondary mb-6">
              Your admin password has been reset successfully. You can now log in with your new password.
            </p>
            <a
              href="/admin"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Go to Admin Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-theme-primary mb-2">Reset Admin Password</h2>
          <p className="text-theme-secondary">Enter a new password for the admin account</p>
        </div>

        {error && (
          <div className=" border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {!codeSent ? (
          // Step 1: Request verification code
          <form onSubmit={handleRequestCode} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-theme-primary mb-2">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
                placeholder="jaakko.rajala@tuni.fi"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors font-semibold"
            >
              {loading ? 'Sending Code...' : 'Send Verification Code'}
            </button>
          </form>
        ) : (
          // Step 2: Enter code and new password
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-theme-primary mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                autoComplete="one-time-code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
                placeholder="Enter 6-digit code from email"
                maxLength={6}
              />
              <p className="text-xs text-theme-secondary mt-1">
                Check your email for the verification code (expires in 15 minutes)
              </p>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-theme-primary mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
                placeholder="Enter new password (min 8 characters)"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-theme-primary mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors font-semibold"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setCodeSent(false)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                ← Back to request code
              </button>
            </div>
          </form>
        )}

        <div className="text-center">
          <a href="/admin" className="text-blue-600 hover:text-blue-700 text-sm">
            Back to Admin Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 