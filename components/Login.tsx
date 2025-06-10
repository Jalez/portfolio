import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthAPI } from '../api/auth/index';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleAdminLogin = async () => {
    if (!adminEmail || !adminPassword) {
      setError('Please enter admin email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const authResponse = await AuthAPI.adminLogin(adminEmail, adminPassword);
      login(authResponse);
      window.location.href = '/admin';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-theme-primary mb-4">You are already logged in!</h2>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-theme text-white px-6 py-2 rounded-lg hover:bg-theme-hover transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-background px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-theme-primary">
            Admin Login
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Admin email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-3 py-2 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
            />
            <input
              type="password"
              placeholder="Admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-3 py-2 border border-theme-border rounded-md bg-theme-background text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-theme"
            />
            <button
              onClick={handleAdminLogin}
              disabled={loading || !adminEmail || !adminPassword}
              className="w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-white bg-theme hover:bg-theme-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme disabled:opacity-50 transition-colors"
            >
              {loading ? 'Signing in...' : 'Admin Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;