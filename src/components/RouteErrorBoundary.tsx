import React, { Component, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from '../lib/design-system';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// Error boundary class component
class RouteErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error for monitoring
    console.error('Route Error Boundary caught an error:', error, errorInfo);
    
    // Here you could send error to monitoring service
    // Example: sendErrorToService(error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state when route changes
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Default error fallback component
const DefaultErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: colors.background.secondary }}
    >
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div 
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: colors.semantic.error + '20' }}
        >
          <svg 
            className="w-10 h-10" 
            style={{ color: colors.semantic.error }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 
          className="text-2xl font-bold mb-4"
          style={{ color: colors.text.primary }}
        >
          Oops! Something went wrong
        </h1>
        
        <p 
          className="text-base mb-6"
          style={{ color: colors.text.secondary }}
        >
          We encountered an unexpected error while loading this page. 
          Don't worry, your data is safe.
        </p>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === 'development' && error && (
          <div 
            className="bg-gray-100 rounded-lg p-4 mb-6 text-left"
            style={{ borderColor: colors.border.primary }}
          >
            <h3 className="font-bold text-sm mb-2 text-red-600">
              Error Details (Development)
            </h3>
            <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-auto max-h-32">
              {error.message}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: colors.primary.blue }}
          >
            Try Again
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={handleGoBack}
              className="flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-100"
              style={{ 
                color: colors.text.primary,
                borderColor: colors.border.primary,
                borderWidth: '1px'
              }}
            >
              Go Back
            </button>
            
            <button
              onClick={handleGoHome}
              className="flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-100"
              style={{ 
                color: colors.text.primary,
                borderColor: colors.border.primary,
                borderWidth: '1px'
              }}
            >
              Home
            </button>
          </div>
        </div>

        {/* Current Route Info */}
        <div className="mt-6 pt-6 border-t" style={{ borderColor: colors.border.primary }}>
          <p 
            className="text-sm"
            style={{ color: colors.text.muted }}
          >
            Current path: <code className="bg-gray-100 px-2 py-1 rounded text-xs">
              {location.pathname}
            </code>
          </p>
        </div>
      </div>
    </div>
  );
};

// Functional wrapper component for hooks support
export const RouteErrorBoundary: React.FC<Props> = ({ children, fallback }) => {
  return (
    <RouteErrorBoundaryClass fallback={fallback}>
      {children}
    </RouteErrorBoundaryClass>
  );
};

export default RouteErrorBoundary;