// src/main.tsx

// Import the necessary React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the Provider component from 'react-redux' which is used to connect the Redux store to the React components
import { Provider } from 'react-redux';

// Import the Redux store from the 'store/store.ts' file
import store from './store/store';

// Import the main App component from the 'App.tsx' file
import App from './App';

// Import the CSS styles from the 'index.css' file
import './index.css';

// Use ReactDOM.createRoot() to create the root element of the application
//  - get the element with the id 'root' from the DOM
//  - cast it to an HTMLElement
//  - render the application into the root element
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // Use the React.StrictMode component to enable additional checks for potential issues in the application
  <React.StrictMode>
    {/* Use the Provider component to wrap the application and provide the Redux store */}
    <Provider store={store}>
      {/* Render the main App component */}
      <App />
    </Provider>
  </React.StrictMode>
);

