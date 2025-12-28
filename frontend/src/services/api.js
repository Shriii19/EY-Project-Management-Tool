import axios from 'axios';

// Create Axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds - increased for slower connections
  withCredentials: true, // Enable cookies for CORS
});

// Request interceptor - attach auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login if needed
        localStorage.removeItem('authToken');
        // window.location.href = '/login'; // Uncomment if auth is implemented
      }
      
      if (status === 404) {
        console.error('Resource not found:', data.message);
      }
      
      if (status >= 500) {
        console.error('Server error:', data.message);
      }
      
      // Return structured error
      return Promise.reject({
        message: data.error?.message || data.message || 'An error occurred',
        status,
        data
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error: No response from server');
    } else {
      // Error in request setup
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
