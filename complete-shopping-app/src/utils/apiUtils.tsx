// src/utils/apiUtils.ts

// Import the axios library for making HTTP requests
import axios from 'axios';

// Import the retrieveToken function from tokenUtils.ts to get the user's token
import { retrieveToken } from './tokenUtils';

// Create an instance of axios with a base URL for all API requests
const apiClient = axios.create({
  baseURL: '/api',
});

// Add an interceptor to the axios instance that runs before every request
apiClient.interceptors.request.use((config) => {
  // Get the user's token from the tokenUtils.ts module
  const token = retrieveToken();

  // If the user is logged in (token exists), add the token to the request headers
  if (token) {
    config.headers.token = token;
  }

  // Return the modified config object to be used for the request
  return config;
});

// Define a function for making GET requests to the API
export const get = (url: string) => {
  // Use the axios instance to make a GET request to the specified URL
  return apiClient.get(url);
};

// Define a function for making POST requests to the API
export const post = (url: string, data: any) => {
  // Use the axios instance to make a POST request to the specified URL with the provided data
  return apiClient.post(url, data);
};

