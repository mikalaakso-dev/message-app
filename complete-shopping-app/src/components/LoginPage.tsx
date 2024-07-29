
// This is the LoginPage component. It allows users to log in by entering their username and password.

import React, { useState, useEffect } from 'react'; // Import the necessary React hooks
import { useDispatch, useSelector } from 'react-redux'; // Import the necessary Redux hooks
import { RootState, AppDispatch } from '../store/store'; // Import the necessary types and actions
import { loginUser, clearError } from '../store/authSlice'; // Import the necessary actions
import { useNavigate } from 'react-router-dom'; // Import the necessary hook for navigation

// Define the LoginPage component as a functional component
const LoginPage: React.FC = () => {
  // Initialize the state variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Get the dispatch function from the Redux store
  const dispatch = useDispatch<AppDispatch>();

  // Get the authentication state from the Redux store
  const auth = useSelector((state: RootState) => state.auth);

  // Get the navigate function from the React Router DOM
  const navigate = useNavigate();

  // Clear the error message when the component mounts or when the dispatch function changes
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Define the handleLogin function to handle the form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Log the username and password being submitted
    console.log('Attempting login with:', { username, password });

    // Dispatch the loginUser action with the username and password
    const resultAction = await dispatch(loginUser({ username, password }));

    // Log the result of the login action
    console.log('Login result:', resultAction);

    // If the login action is successful, navigate to the messages page
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/messages');
    }
  };

  // Render the LoginPage component
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Render the heading for the login page */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
      </div>

      {/* Render the form for the login page */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Render the input field for the username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Render the input field for the password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Render the error message if there is an error */}
            {auth.error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{auth.error}</h3>
                  </div>
                </div>
              </div>
            )}

            {/* Render the submit button for the form */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export the LoginPage component
export default LoginPage;

