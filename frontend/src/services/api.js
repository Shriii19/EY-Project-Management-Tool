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

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to determine if request should be retried
const shouldRetry = (error) => {
  if (!error.response) {
    // Network errors should be retried
    return true;
  }
  
  const status = error.response.status;
  // Retry on 408 (Request Timeout), 429 (Too Many Requests), 500+ (Server errors)
  return status === 408 || status === 429 || status >= 500;
};

// Request interceptor - attach auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add retry count to config
    config.retryCount = config.retryCount || 0;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally with retry logic
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    
    // Check if we should retry the request
    if (config && shouldRetry(error) && config.retryCount < MAX_RETRIES) {
      config.retryCount += 1;
      
      console.log(`Retrying request (${config.retryCount}/${MAX_RETRIES})...`);
      
      // Exponential backoff: wait longer with each retry
      await delay(RETRY_DELAY * config.retryCount);
      
      return api.request(config);
    }
    
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
      
      if (status === 429) {
        console.error('Rate limit exceeded. Please try again later.');
      }
      
      if (status >= 500) {
        console.error('Server error:', data.message);
      }
      
      // Return structured error
      return Promise.reject({
        message: data.error?.message || data.message || 'An error occurred',
        status,
        data,
        retried: config.retryCount > 0
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error: No response from server');
      return Promise.reject({
        message: 'Network error: Unable to connect to server',
        status: 0,
        retried: config?.retryCount > 0
      });
    } else {
      // Error in request setup
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
