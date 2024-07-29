// src/store/authSlice.ts
// This file contains the code for managing authentication state in the Redux store.

// Import necessary dependencies
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { storeToken, clearToken, retrieveToken } from '../utils/tokenUtils';

// Define the shape of the authentication state
interface AuthState {
  token: string | null; // The authentication token, or null if not logged in
  isAuthenticated: boolean; // Whether the user is logged in
  error: string | null; // Any error that occurred during authentication
}

// Set the initial state of the authentication slice
const initialState: AuthState = {
  token: retrieveToken(), // Retrieve the stored token, or null if none exists
  isAuthenticated: !!retrieveToken(), // Check if the token exists
  error: null, // No error initially
};

// Async thunk for logging in
// This function sends a POST request to the '/login' endpoint with the user's credentials
// If the request is successful, it stores the token and updates the authentication state
export const loginUser = createAsyncThunk(
  'auth/loginUser', // Action type
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', credentials); // Send the login request
      console.log('Login response:', response.data); // Log the response
      storeToken(response.data.token); // Store the token
      return response.data; // Return the response data
    } catch (err) {
      console.error('Login error:', err); // Log any errors that occur
      return rejectWithValue('Login failed'); // Return an error message
    }
  }
);

// Async thunk for registering a new user
// This function sends a POST request to the '/register' endpoint with the user's credentials
// If the request is successful, it updates the authentication state
export const registerUser = createAsyncThunk(
  'auth/registerUser', // Action type
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/register', credentials); // Send the registration request
      return response.data; // Return the response data
    } catch (err) {
      return rejectWithValue('Registration failed'); // Return an error message
    }
  }
);

// Async thunk for logging out
// This function sends a POST request to the '/logout' endpoint with the user's authentication token
// If the request is successful, it clears the token and updates the authentication state
export const logoutUser = createAsyncThunk(
  'auth/logoutUser', // Action type
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: AuthState }; // Get the current authentication state
    try {
      await axios.post('/logout', null, {
        headers: { token: state.auth.token }, // Send the logout request with the token
      });
      clearToken(); // Clear the token
      return true; // Return a success message
    } catch (err) {
      return rejectWithValue('Logout failed'); // Return an error message
    }
  }
);

// Create the authentication slice
const authSlice = createSlice({
  name: 'auth', // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer for successful login
    loginSuccess(state, action: PayloadAction<{ token: string }>) {
      state.isAuthenticated = true; // User is now logged in
      state.token = action.payload.token; // Store the token
      state.error = null; // No error
    },
    // Reducer for logout
    logout(state) {
      state.isAuthenticated = false; // User is now logged out
      state.token = null; // Clear the token
      state.error = null; // No error
      clearToken(); // Clear the stored token
    },
    // Reducer for successful registration
    registerSuccess(state) {
      state.error = null; // No error
    },
    // Reducer for clearing the error state
    clearError(state) {
      state.error = null; // Clear the error
    },
  },
  // Handle asynchronous actions
  extraReducers: (builder) => {
    // Handle successful login
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
      state.isAuthenticated = true; // User is now logged in
      state.token = action.payload.token; // Store the token
      state.error = null; // No error
    });
    // Handle failed login
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload; // Store the error message
    });
    // Handle successful registration
    builder.addCase(registerUser.fulfilled, (state) => {
      state.error = null; // No error
    });
    // Handle failed registration
    builder.addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload; // Store the error message
    });
    // Handle successful logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false; // User is now logged out
      state.token = null; // Clear the token
      state.error = null; // No error
    });
    // Handle failed logout
    builder.addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload; // Store the error message
    });
  },
});

// Export the authentication actions and reducer
export const { loginSuccess, logout, registerSuccess, clearError } = authSlice.actions;
export default authSlice.reducer;

