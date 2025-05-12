import axios from 'axios';

const API = axios.create({
  baseURL: 'https://fresh-tiger-fluent.ngrok-free.app/',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Optional: Add request/response interceptors 
API.interceptors.request.use(
  (config) => {
    // You can modify headers here (e.g., attach token)
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default API;
