import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../hooks/useAuth';
import { useMobileNavigation } from '../hooks/useMobileNavigation';
import { colors } from '../lib/design-system';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    isMobile,
    showMobileOverlay 
  } = useMobileNavigation();

  // Handle escape key for mobile sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobile, sidebarOpen, setSidebarOpen]);

  // Prevent scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, sidebarOpen]);

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: colors.background.secondary }}
    >
      {/* Top Navigation Bar */}
      <TopBar 
        user={user}
      />
      
      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        {/* Main Content Area */}
        <main 
          className={`
            flex-1 overflow-y-auto transition-all duration-300 ease-in-out
            ${sidebarOpen && !isMobile ? 'ml-0' : ''}
          `}
          role="main"
          aria-label="Main content"
        >
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Render children (for direct usage) or Outlet (for router usage) */}
            {children || <Outlet />}
          </div>
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {showMobileOverlay && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSidebarOpen(false);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}
    </div>
  );
};

export default MainLayout;