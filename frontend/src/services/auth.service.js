import api from './api';

/**
 * Auth/User Service
 * Handles user authentication and profile management
 */

// Login user
export const login = async (email, password) => {
  try {
    const response = await api.post('/api/user/login', { email, password });
    if (response.data.success && response.data.token) {
      setAuthToken(response.data.token);
      return response.data;
    }
    throw new Error('Login failed');
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Signup user
export const signup = async (name, email, password) => {
  try {
    const response = await api.post('/api/user/signup', { name, email, password });
    if (response.data.success && response.data.token) {
      setAuthToken(response.data.token);
      return response.data;
    }
    throw new Error('Signup failed');
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Logout user
export const logout = () => {
  clearAuthToken();
  window.location.href = '/login';
};

// Get current user profile
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/user/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/api/user/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Set auth token in localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// Get auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Remove auth token (logout)
export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

export default {
  getCurrentUser,
  updateProfile,
  setAuthToken,
  getAuthToken,
  clearAuthToken,
  isAuthenticated,
};
