// src/store/store.tsx

// Import the configureStore function from @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import the auth reducer from the authSlice file
import authReducer from './authSlice';

// Import the message reducer from the messageSlice file
import messageReducer from './messageSlice';

// Import the user reducer from the userSlice file
import userReducer from './userSlice';

// Create the Redux store using the configureStore function
// The configureStore function takes an object with a reducer property
// The reducer property is an object with keys representing the different named slices of the Redux store
// Each key corresponds to a reducer function that handles a specific part of the state tree
// In this case, we have three slices: 'auth', 'messages', and 'users'
// The 'auth' slice is handled by the authReducer function
// The 'messages' slice is handled by the messageReducer function
// The 'users' slice is handled by the userReducer function
const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the 'auth' slice to the Redux store
    messages: messageReducer,  // Add the 'messages' slice to the Redux store
    users: userReducer,  // Add the 'users' slice to the Redux store
  },
});

// Define the type of the root state object using the ReturnType utility type
// The ReturnType utility type takes a function as an argument and returns the type of the return value of that function
// In this case, we use the ReturnType utility type to define the type of the root state object as the type of the return value of the store.getState function
export type RootState = ReturnType<typeof store.getState>;

// Define the type of the dispatch function using the typeof operator
// The typeof operator returns the type of a value or expression
// In this case, we use the typeof operator to define the type of the dispatch function as the type of the store.dispatch function
export type AppDispatch = typeof store.dispatch;

// Export the Redux store
export default store;

