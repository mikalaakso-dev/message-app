// src/components/ProtectedRoute.tsx

// This component is a high-order component (HOC) that wraps other components and
// enforces that the user must be authenticated in order to access them.

// It takes a single prop, 'children', which is the component that will be rendered
// if the user is authenticated.

// The component first imports the necessary dependencies.

import React from 'react';

// The 'useSelector' hook is used to access the Redux store and retrieve the
// authentication state.
import { useSelector } from 'react-redux';

// The 'Navigate' component is used to programmatically navigate to a different route.
import { Navigate } from 'react-router-dom';

// The 'RootState' type is imported from the root Redux store to access the authentication
// state.
import { RootState } from '../store/store';

// The 'ProtectedRouteProps' interface defines the shape of the props that this component
// expects. In this case, it expects a single prop, 'children', which is the component
// that will be rendered if the user is authenticated.
interface ProtectedRouteProps {
  children: React.ReactNode;
}

// The 'ProtectedRoute' component is defined as a functional component that takes in
// the 'ProtectedRouteProps' as its props.
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // The 'useSelector' hook is used to access the Redux store and retrieve the
  // authentication state. It takes a selector function as its argument, which selects
  // the 'isAuthenticated' property from the authentication state.
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // If the user is not authenticated, the component renders a 'Navigate' component
  // that programmatically navigates to the '/login' route.
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, the component renders the 'children' prop that was
  // passed to it.
  return <>{children}</>;
};

// The 'ProtectedRoute' component is exported so that it can be used in other parts of the
// application.
export default ProtectedRoute;

