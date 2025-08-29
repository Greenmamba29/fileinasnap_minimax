import React from 'react';
import { Outlet } from 'react-router-dom';
import { colors } from '../lib/design-system';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: colors.background.secondary }}
    >
      <div className="w-full max-w-md">
        {/* Branding Section */}
        <div className="text-center mb-8">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: colors.primary.blue }}
          >
            <img 
              src="/icons/logo-fileinasnap.png" 
              alt="FileInASnap Logo" 
              className="w-10 h-10 filter brightness-0 invert"
            />
          </div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: colors.text.primary }}
          >
            FileInASnap
          </h1>
          <p 
            className="text-lg"
            style={{ color: colors.text.secondary }}
          >
            Intelligent File Management with AI
          </p>
        </div>

        {/* Authentication Content */}
        <div 
          className="bg-white rounded-lg shadow-lg p-6 sm:p-8"
          style={{ borderColor: colors.border.primary }}
        >
          {/* Render children (for direct usage) or Outlet (for router usage) */}
          {children || <Outlet />}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p 
            className="text-sm"
            style={{ color: colors.text.muted }}
          >
            © 2024 FileInASnap. Powered by AI for smarter file management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;