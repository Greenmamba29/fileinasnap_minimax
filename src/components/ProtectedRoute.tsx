import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../lib/design-system';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while authentication status is being determined
  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background.secondary }}
      >
        <div className="text-center">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: colors.primary.blue }}
          >
            <img 
              src="/icons/logo-fileinasnap.png" 
              alt="FileInASnap" 
              className="w-10 h-10 filter brightness-0 invert"
            />
          </div>
          <div 
            className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: colors.primary.blue }}
          />
          <p 
            className="text-lg font-medium"
            style={{ color: colors.text.primary }}
          >
            Loading FileInASnap...
          </p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !user) {
    // Preserve the current location to redirect back after login
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname + location.search }} 
        replace 
      />
    );
  }

  // If authentication is not required but user is authenticated (e.g., login page)
  if (!requireAuth && user) {
    // Get the redirect location from state or default to dashboard
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  // User meets the authentication requirements, render the children
  return <>{children}</>;
};

// Higher-order component for wrapping components with authentication
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  requireAuth: boolean = true
) => {
  const WrappedComponent = (props: P) => (
    <ProtectedRoute requireAuth={requireAuth}>
      <Component {...props} />
    </ProtectedRoute>
  );

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

export default ProtectedRoute;