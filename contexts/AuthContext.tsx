import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthAPI, AuthResponse } from '../api/auth/index';

interface AuthUser {
  id: number;
  email: string;
  name: string;
  image_url?: string;
  is_admin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        try {
          const userData = await AuthAPI.verifyToken(storedToken);
          if (userData) {
            setUser(userData);
            setToken(storedToken);
          } else {
            localStorage.removeItem('auth_token');
          }
        } catch (error) {
          console.error('Failed to verify token:', error);
          localStorage.removeItem('auth_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (authResponse: AuthResponse) => {
    setUser(authResponse.user);
    setToken(authResponse.token);
    localStorage.setItem('auth_token', authResponse.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin || false,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};