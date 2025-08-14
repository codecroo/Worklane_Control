import axios from 'axios';
import { refreshAccessToken } from './refreshAccessToken';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

// Request Interceptor:
// Runs before every request → attaches the latest token from localStorage
axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor:
// Runs after a response is received OR an error happens
axiosInstance.interceptors.response.use(
  (response) => response, // If request is fine, just pass it through

  async (error) => {
    const originalRequest = error.config;

    // If unauthorized AND we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh the access token
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Update headers for future requests
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        // Update the current failed request’s headers
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // Retry the original request
        return axiosInstance(originalRequest);
      }
    }

    // If refresh failed or it wasn’t a 401, just reject the error
    return Promise.reject(error);
  }
);

export default axiosInstance;