import axios from 'axios';

// Base configuration for Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    const userData = sessionStorage.getItem('yimaru_user');
    if (userData) {
      try {
        const { token } = JSON.parse(userData);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.error('Error parsing token from session storage', err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific status codes
    if (error.response?.status === 401) {
      // Potentially trigger a logout or redirect to login
      console.warn('Unauthorized! Redirecting...');
      // window.location.href = '/login'; 
    }
    
    // Customize error object for easier consumption in components
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject({ ...error, message });
  }
);

export default api;
