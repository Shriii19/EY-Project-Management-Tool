import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, getAuthToken, clearAuthToken, isAuthenticated } from '../services/auth.service';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (isAuthenticated()) {
          const userData = await getCurrentUser();
          setUser(userData.user);
          setIsAuth(true);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        clearAuthToken();
        setUser(null);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsAuth(true);
  };

  const logout = () => {
    clearAuthToken();
    setUser(null);
    setIsAuth(false);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    loading,
    isAuthenticated: isAuth,
    login,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
