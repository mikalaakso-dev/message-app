// src/components/ErrorBoundary.tsx

// This is a React component that wraps around other components
// and catches any uncaught errors that occur within them.
// If an error occurs, it will display a message instead of the component.

import React, { Component, ErrorInfo, ReactNode } from "react";

// This is the interface for the props that this component receives.
// It has a single property called "children" which is optional and can be any ReactNode.
interface Props {
  children?: ReactNode;
}

// This is the interface for the state of this component.
// It has a single property called "hasError" which is a boolean.
interface State {
  hasError: boolean;
}

// This is the main component that wraps around other components and catches errors.
class ErrorBoundary extends Component<Props, State> {
  // This is the constructor for the component.
  // It initializes the state to have a "hasError" property set to false.
  public state: State = {
    hasError: false
  };

  // This is a static method that is called when an error occurs in any component.
  // It takes in an error object and returns a new state object with the "hasError" property set to true.
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // This is a method that is called when an error occurs in any component.
  // It takes in an error object and an error info object and logs the error to the console.
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  // This is the render method that determines what to display to the user.
  // If an error has occurred, it displays a message saying that an error occurred.
  // Otherwise, it displays the children of this component.
  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

// This exports the ErrorBoundary component so that it can be used in other parts of the application.
export default ErrorBoundary;
