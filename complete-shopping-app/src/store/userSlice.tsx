// src/store/userSlice.tsx

// Import the necessary toolkit for Redux
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import the necessary library for making HTTP requests
import axios from 'axios';

// Define the shape of a user object
interface User {
  username: string;
  messagetoken: string;
}

// Define the shape of the state for the users
interface UsersState {
  // Array to store the users
  users: User[];
  // String to store any error messages
  error: string | null;
}

// Define the initial state for the users
const initialState: UsersState = {
  users: [],
  error: null,
};

// Define an async thunk to fetch the users from the API
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers', // The name of the action
  async (_, { getState, rejectWithValue }) => {
    // Get the current state from the Redux store
    const state = getState() as { auth: { token: string | null } };

    try {
      // Make a GET request to the '/api/users' endpoint with the user's token in the headers
      const response = await axios.get('/api/users', {
        headers: {
          token: state.auth.token,
        },
      });

      // Return the data from the response
      return response.data;
    } catch (err) {
      // If there's an error, return a string indicating the failure
      return rejectWithValue('Fetch users failed');
    }
  }
);

// Define the slice for the users in the Redux store
const usersSlice = createSlice({
  name: 'users', // The name of the slice
  initialState, // The initial state of the slice
  reducers: {}, // The reducers for the slice (currently empty)
  extraReducers: (builder) => {
    // Add the logic to handle the fulfilled and rejected actions from the fetchUsers thunk
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // When the fetchUsers thunk is successful, update the users array in the state with the data from the action
        state.users = action.payload;
        // Clear the error message
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        // When the fetchUsers thunk is rejected, update the error message in the state with the payload from the action
        state.error = action.payload as string;
      });
  },
});

// Export the reducer for the users slice
export default usersSlice.reducer;
