import React, { Component } from 'react';
import Fallback from './Fallback';
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // You can also log the error information here
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Return your fallback component or an error message
      return <Fallback />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
