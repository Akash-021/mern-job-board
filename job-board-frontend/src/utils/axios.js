import axios from 'axios';
import { logout } from './auth'; // Logout user if token expires

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach token to every request (if available)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

// Handle token expiration or invalid token errors globally
instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
        logout(); // Clear token and redirect to login
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

export default instance;
