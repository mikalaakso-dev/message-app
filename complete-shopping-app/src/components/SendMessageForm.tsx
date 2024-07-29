// This component is responsible for sending a message to a specific user.
// It takes in the recipient's messagetoken as a parameter in the URL.

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { sendMessage } from '../store/messageSlice';
import { useNavigate } from 'react-router-dom';

// This is the functional component for sending a message.
const SendMessageForm: React.FC = () => {
  // Destructure the messagetoken from the URL parameters.
  const { messagetoken } = useParams<{ messagetoken: string }>();

  // Create a state variable to hold the message content.
  const [message, setMessage] = useState('');

  // Get the dispatch function from React-Redux.
  const dispatch = useDispatch<AppDispatch>();

  // Get the navigate function from React-Router-Dom.
  const navigate = useNavigate();

  // Select the error message from the Redux store.
  const error = useSelector((state: RootState) => state.messages.error);

  // This function handles the submission of the form.
  const handleSubmit = async (event: React.FormEvent) => {
    // Prevent the default form submission behavior.
    event.preventDefault();

    // Dispatch the sendMessage action with the recipient's messagetoken and the message content.
    await dispatch(sendMessage({ messagetoken, message }));

    // If there is no error, navigate to the messages page.
    if (!error) {
      navigate('/messages');
    }
  };

  // This is the JSX that gets returned by the component.
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Send Message</h2>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            {/* If there is an error message, display it in a red box. */}
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export the component for use in other parts of the application.
export default SendMessageForm;

