// Import the necessary dependencies for the redux toolkit slice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the shape of the message data
interface Message {
  id: number;
  from: string;
  message: string;
}

// Define the shape of the messages state
interface MessagesState {
  messages: Message[]; // The list of messages
  error: string | null; // Any error that occurred while fetching or sending messages
}

// Define the initial state for the messages slice
const initialState: MessagesState = {
  messages: [], // Empty list of messages
  error: null, // No initial error
};

// Define the asynchronous thunk for fetching messages
export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (_, { getState, rejectWithValue }) => {
  // Get the state from the store
  const state = getState() as { auth: { token: string | null } };
  try {
    // Make a GET request to the '/api/messages' endpoint with the token in the headers
    const response = await axios.get('/api/messages', {
      headers: {
        token: state.auth.token,
      },
    });
    // Return the response data
    return response.data;
  } catch (err) {
    // If there was an error, return a rejected promise with the error message
    return rejectWithValue('Fetch messages failed');
  }
});

// Define the asynchronous thunk for sending a message
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ messagetoken, message }: { messagetoken: string; message: string }, { getState, rejectWithValue }) => {
    // Get the state from the store
    const state = getState() as { auth: { token: string | null } };
    try {
      // Make a POST request to the '/api/messages' endpoint with the token and message data in the body
      const response = await axios.post('/api/messages', { messagetoken, message }, {
        headers: {
          token: state.auth.token,
        },
      });
      // Return the response data
      return response.data;
    } catch (err) {
      // If there was an error, return a rejected promise with the error message
      return rejectWithValue('Send message failed');
    }
  }
);

// Create the slice for the messages reducer
const messageSlice = createSlice({
  name: 'messages', // The name of the slice
  initialState, // The initial state for the slice
  reducers: {}, // No custom reducers
  extraReducers: (builder) => {
    // Add reducers for the fetchMessages and sendMessage thunks
    builder
      .addCase(fetchMessages.fulfilled, // When the fetchMessages thunk is fulfilled
        (state, action: PayloadAction<Message[]>) => {
          // Update the state with the fetched messages and clear the error
          state.messages = action.payload;
          state.error = null;
        })
      .addCase(fetchMessages.rejected, // When the fetchMessages thunk is rejected
        (state, action: PayloadAction<any>) => {
          // Update the state with the error
          state.error = action.payload;
        })
      .addCase(sendMessage.fulfilled, // When the sendMessage thunk is fulfilled
        (state, action: PayloadAction<{ messagetoken: string; message: string }>) => {
          // Clear the error
          state.error = null;
        })
      .addCase(sendMessage.rejected, // When the sendMessage thunk is rejected
        (state, action: PayloadAction<any>) => {
          // Update the state with the error
          state.error = action.payload;
        });
  },
});

// Export the reducer for the messages slice
export default messageSlice.reducer;

