// src/App.tsx
// This is the main component of the app. It sets up the routing and navigation
// for the app.

import React from 'react';

// Import necessary components from react-router-dom
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

// Import necessary components for the app
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MessageListPage from './components/MessageListPage';
import SendMessagePage from './components/SendMessagePage';
import SendMessageForm from './components/SendMessageForm';
import ProtectedRoute from './components/ProtectedRoute';

// Import necessary functions for Redux
import { useSelector } from 'react-redux';

// Import necessary types for Redux
import { RootState } from './store/store';

// Import the ErrorBoundary component
import ErrorBoundary from './components/ErrorBoundary';

// Define the main App component
const App: React.FC = () => {
  // Get the authentication state from Redux
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Return the main component
  return (
    // Wrap the component in an ErrorBoundary to catch any errors
    <ErrorBoundary>
      {/* Set up the router */}
      <Router>
        {/* Set up the navigation bar */}
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4">
            {/* Set up the login link */}
            <li>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
            {/* Set up the register link */}
            <li>
              <Link to="/register" className="text-white hover:text-gray-300">
                Register
              </Link>
            </li>
            {/* If the user is authenticated, show the messages and send message links */}
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/messages" className="text-white hover:text-gray-300">
                    Messages
                  </Link>
                </li>
                <li>
                  <Link to="/send-message" className="text-white hover:text-gray-300">
                    Send Message
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        {/* Set up the routes for the app */}
        <Routes>
          {/* Set up the login route */}
          <Route path="/login" element={<LoginPage />} />
          {/* Set up the register route */}
          <Route path="/register" element={<RegisterPage />} />
          {/* Set up the protected messages route */}
          <Route path="/messages" element={<ProtectedRoute><MessageListPage /></ProtectedRoute>} />
          {/* Set up the protected send message route */}
          <Route path="/send-message" element={<ProtectedRoute><SendMessagePage /></ProtectedRoute>} />
          {/* Set up the protected send message form route */}
          <Route path="/send-message/:messagetoken" element={<ProtectedRoute><SendMessageForm /></ProtectedRoute>} />
          {/* Set up the default route that redirects to the messages page if the user is authenticated, otherwise to the login page */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/messages" : "/login"} />} />
          {/* Set up the catch-all route that redirects to the default route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

// Export the main App component
export default App;

