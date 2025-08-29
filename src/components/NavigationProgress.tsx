import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { colors } from '../lib/design-system';

interface NavigationProgressProps {
  className?: string;
  thickness?: number;
  color?: string;
  duration?: number;
}

export const NavigationProgress: React.FC<NavigationProgressProps> = ({
  className = '',
  thickness = 3,
  color = colors.primary.blue,
  duration = 300
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Start progress when location changes
    setIsVisible(true);
    setProgress(20);

    // Simulate progress
    const timer1 = setTimeout(() => setProgress(60), 100);
    const timer2 = setTimeout(() => setProgress(90), 200);
    const timer3 = setTimeout(() => {
      setProgress(100);
      // Hide after completion
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 200);
    }, duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname, duration]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Navigation progress"
    >
      <div 
        className="h-full transition-all duration-300 ease-out"
        style={{
          height: `${thickness}px`,
          width: `${progress}%`,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}50`
        }}
      />
    </div>
  );
};

// Loading spinner component for route transitions
export const RouteLoadingSpinner: React.FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ 
  size = 32, 
  color = colors.primary.blue,
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="animate-spin rounded-full border-4 border-t-transparent"
        style={{
          width: size,
          height: size,
          borderColor: `${color}30`,
          borderTopColor: color
        }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

// Full page loading component for lazy routes
export const RouteLoadingPage: React.FC<{
  message?: string;
}> = ({ message = 'Loading...' }) => {
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
        <RouteLoadingSpinner className="mb-4" />
        <p 
          className="text-lg font-medium"
          style={{ color: colors.text.primary }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

// Hook for monitoring route changes
export const useNavigationProgress = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return { isNavigating };
};

export default NavigationProgress;