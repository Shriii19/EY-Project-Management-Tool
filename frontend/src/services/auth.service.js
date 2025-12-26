import api from './api';

/**
 * Auth/User Service
 * Handles user authentication and profile management
 */

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
