// src/utils/tokenUtils.ts

// This file contains utility functions for handling user authentication tokens.

// The storeToken function is used to store the user's authentication token in the browser's local storage.
// It takes a string parameter, which is the token to be stored.
// The function uses the localStorage.setItem method to store the token with the key 'token'.
export const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};

// The retrieveToken function is used to retrieve the user's authentication token from the browser's local storage.
// It returns a string or null. If the token is found in local storage, it is returned. If not, null is returned.
export const retrieveToken = (): string | null => {
  return localStorage.getItem('token');
};

// The clearToken function is used to remove the user's authentication token from the browser's local storage.
// It does not take any parameters and does not return anything.
export const clearToken = () => {
  localStorage.removeItem('token');
};

