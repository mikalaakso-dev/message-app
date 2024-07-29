// This component is responsible for displaying a list of users and allowing the user
// to send a message to each user.

import React, { useEffect } from 'react';

// Import necessary hooks and functions from react-redux and react-router-dom
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUsers } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

// Define the SendMessagePage component as a functional component
const SendMessagePage: React.FC = () => {
  // Use the useDispatch hook to get a reference to the dispatch function from the store
  const dispatch = useDispatch<AppDispatch>();

  // Use the useSelector hook to get the list of users and any error message from the store
  const users = useSelector((state: RootState) => state.users.users);
  const error = useSelector((state: RootState) => state.users.error);

  // Use the useNavigate hook to get a reference to the navigate function from react-router-dom
  const navigate = useNavigate();

  // Use the useEffect hook to fetch the list of users when the component is first rendered
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Define a function to handle the click event when the user clicks the "Send Message" button
  const handleSendMessage = (messagetoken: string) => {
    // Navigate to the /send-message/[messagetoken] route
    navigate(`/send-message/${messagetoken}`);
  };

  // Render the SendMessagePage component
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Send Message</h2>
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            {/* Display an error message if there is an error fetching the list of users */}
            {error && <div className="text-red-500">Fetch users failed</div>}
            <ul className="divide-y divide-gray-200">
              {/* Render a list of users */}
              {users.map((user) => (
                <li key={user.messagetoken} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{user.username}</p>
                    <div className="ml-2 flex-shrink-0">
                      {/* Render a "Send Message" button for each user */}
                      <button
                        onClick={() => handleSendMessage(user.messagetoken)}
                        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the SendMessagePage component as the default export
export default SendMessagePage;

