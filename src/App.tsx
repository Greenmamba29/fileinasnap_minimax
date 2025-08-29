import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { I18nProvider } from './context/I18nContext';
import { LoadingProvider } from './context/LoadingContext';
import { AppRouter } from './router';
import { SkipToContent } from './components/SkipToContent';
import { NavigationProgress } from './components/NavigationProgress';

// Global styles
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <I18nProvider>
        <AuthProvider>
          <LoadingProvider>
            {/* Accessibility: Skip to content link */}
            <SkipToContent />
            
            {/* Global navigation progress indicator */}
            <NavigationProgress />
            
            {/* Main application router */}
            <AppRouter />
          </LoadingProvider>
        </AuthProvider>
      </I18nProvider>
    </HelmetProvider>
  );
}

export default App;