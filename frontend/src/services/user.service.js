import api from './api';

/**
 * User Service
 * Handles all user and profile-related API calls
 */

/**
 * Get current user profile
 * @returns {Promise} User profile data
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/users/me');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

/**
 * Update user profile
 * @param {Object} profileData - Updated profile information
 * @returns {Promise} Updated user data
 */
export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/api/users/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

/**
 * Get user statistics
 * @param {string} userId - User ID (optional, defaults to current user)
 * @returns {Promise} User statistics
 */
export const getUserStats = async (userId = null) => {
  try {
    const endpoint = userId ? `/api/users/${userId}/stats` : '/api/users/stats';
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Get user stats error:', error);
    throw error;
  }
};

/**
 * Get user activity history
 * @param {number} limit - Number of activities to fetch
 * @returns {Promise} User activity data
 */
export const getUserActivity = async (limit = 10) => {
  try {
    const response = await api.get(`/api/users/activity?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Get user activity error:', error);
    throw error;
  }
};

/**
 * Upload user avatar
 * @param {File} file - Avatar image file
 * @returns {Promise} Avatar URL
 */
export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await api.post('/api/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload avatar error:', error);
    throw error;
  }
};

/**
 * Delete user avatar
 * @returns {Promise} Success status
 */
export const deleteAvatar = async () => {
  try {
    const response = await api.delete('/api/users/avatar');
    return response.data;
  } catch (error) {
    console.error('Delete avatar error:', error);
    throw error;
  }
};

export default {
  getCurrentUser,
  updateUserProfile,
  getUserStats,
  getUserActivity,
  uploadAvatar,
  deleteAvatar,
};
