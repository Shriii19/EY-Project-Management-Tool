/**
 * Authentication Context
 * Manages user authentication state and provides authentication methods
 * throughout the application
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, getAuthToken, setAuthToken, clearAuthToken, isAuthenticated } from '../services/auth.service';

const AuthContext = createContext(null);

/**
 * Custom hook to access authentication context
 * @returns {Object} Authentication context containing user data and auth methods
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * Wraps the application and provides authentication state and methods
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component with authentication context
 */
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

  /**
   * Login user and set authentication token
   * @param {Object} userData - User data object
   * @param {string} [token] - Optional authentication token
   */
  const login = (userData, token) => {
    if (token) {
      setAuthToken(token);
    }
    setUser(userData);
    setIsAuth(true);
  };

  /**
   * Logout user and clear authentication state
   */
  const logout = () => {
    clearAuthToken();
    setUser(null);
    setIsAuth(false);
  };

  /**
   * Update current user data
   * @param {Object} userData - Updated user data object
   */
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
