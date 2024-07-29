// This is the MessageListPage component. It is responsible for displaying a list of messages.
// It uses React hooks for state management and Redux for data fetching.

import React, { useEffect } from 'react'; // Import the necessary React and hooks
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks for state management
import { RootState, AppDispatch } from '../store/store'; // Import types for Redux state
import { fetchMessages } from '../store/messageSlice'; // Import the action for fetching messages
import { logoutUser } from '../store/authSlice'; // Import the action for logging out

const MessageListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Get the Redux dispatch function
  const messages = useSelector((state: RootState) => state.messages.messages); // Get the messages from the Redux state
  const error = useSelector((state: RootState) => state.messages.error); // Get any error from the Redux state

  useEffect(() => {
    dispatch(fetchMessages()); // Fetch messages when the component mounts
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser()); // Log out when the logout button is clicked
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Messages</h2> {/* Display the title */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button> {/* Display the logout button */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            {error && <div className="text-red-500">Fetch messages failed</div>} {/* Display an error message if there is one */}
            <ul className="divide-y divide-gray-200">
              {messages.map((message) => (
                <li key={message.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{message.from}</p> {/* Display the sender of the message */}
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {message.message}
                      </p> {/* Display the content of the message */}
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

export default MessageListPage;

