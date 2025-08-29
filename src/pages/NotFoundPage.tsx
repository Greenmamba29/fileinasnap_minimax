import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAccessibleRouting } from '../hooks/useAccessibleRouting';
import { colors } from '../lib/design-system';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPageTitle } = useAccessibleRouting();

  React.useEffect(() => {
    setPageTitle('Page Not Found - FileInASnap');
  }, [setPageTitle]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Suggest similar pages based on the current path
  const getSuggestedPages = () => {
    const path = location.pathname.toLowerCase();
    const suggestions = [];

    if (path.includes('document')) {
      suggestions.push({ path: '/folders/documents', label: 'Documents Folder' });
    }
    if (path.includes('media') || path.includes('image') || path.includes('photo')) {
      suggestions.push({ path: '/folders/media', label: 'Media Files' });
    }
    if (path.includes('project')) {
      suggestions.push({ path: '/folders/projects', label: 'Projects Folder' });
    }
    if (path.includes('ai') || path.includes('analysis')) {
      suggestions.push({ path: '/ai-analysis', label: 'AI Analysis' });
    }
    if (path.includes('organiz')) {
      suggestions.push({ path: '/smart-organizer', label: 'Smart Organizer' });
    }
    if (path.includes('duplicate')) {
      suggestions.push({ path: '/duplicate-detector', label: 'Duplicate Detector' });
    }
    if (path.includes('tag')) {
      suggestions.push({ path: '/smart-tagger', label: 'Smart Tagger' });
    }

    // Default suggestions if no matches
    if (suggestions.length === 0) {
      suggestions.push(
        { path: '/', label: 'Dashboard' },
        { path: '/ai-analysis', label: 'AI Analysis' },
        { path: '/folders/documents', label: 'Documents' }
      );
    }

    return suggestions;
  };

  const suggestedPages = getSuggestedPages();

  return (
    <>
      <Helmet>
        <title>Page Not Found - FileInASnap</title>
        <meta name="description" content="The page you're looking for could not be found. Return to your dashboard or explore our AI-powered file management features." />
      </Helmet>
      
      <div 
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: colors.background.secondary }}
      >
        <div className="max-w-lg w-full text-center">
          {/* 404 Animation/Visual */}
          <div className="mb-8">
            <div 
              className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.semantic.error + '20' }}
            >
              <div className="text-6xl">🔍</div>
            </div>
            <div className="text-8xl font-bold mb-4" style={{ color: colors.semantic.error }}>
              404
            </div>
          </div>

          {/* Error Message */}
          <h1 
            className="text-3xl font-bold mb-4"
            style={{ color: colors.text.primary }}
          >
            Page Not Found
          </h1>
          
          <p 
            className="text-lg mb-8"
            style={{ color: colors.text.secondary }}
          >
            Oops! The page you're looking for seems to have been moved, deleted, 
            or doesn't exist. But don't worry, we'll help you find what you need.
          </p>

          {/* Current Path Info */}
          <div 
            className="bg-white rounded-lg p-4 mb-8 border"
            style={{ borderColor: colors.border.primary }}
          >
            <p className="text-sm mb-2" style={{ color: colors.text.secondary }}>
              You tried to access:
            </p>
            <code 
              className="bg-gray-100 px-3 py-2 rounded text-sm break-all"
              style={{ color: colors.text.primary }}
            >
              {location.pathname}
            </code>
          </div>

          {/* Suggested Pages */}
          {suggestedPages.length > 0 && (
            <div className="mb-8">
              <h2 
                className="text-lg font-semibold mb-4"
                style={{ color: colors.text.primary }}
              >
                You might be looking for:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="bg-white rounded-lg p-4 border text-left hover:shadow-md transition-shadow"
                    style={{ borderColor: colors.border.primary }}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-8 h-8 rounded flex items-center justify-center mr-3"
                        style={{ backgroundColor: colors.primary.blue + '20' }}
                      >
                        <svg 
                          className="w-4 h-4" 
                          style={{ color: colors.primary.blue }} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span 
                        className="font-medium"
                        style={{ color: colors.text.primary }}
                      >
                        {page.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoHome}
              className="w-full py-3 px-6 rounded-lg font-medium text-white transition-colors duration-200 hover:opacity-90"
              style={{ backgroundColor: colors.primary.blue }}
            >
              Go to Dashboard
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={handleGoBack}
                className="flex-1 py-3 px-6 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-100"
                style={{ 
                  color: colors.text.primary,
                  borderColor: colors.border.primary,
                  borderWidth: '1px'
                }}
              >
                Go Back
              </button>
              
              <Link
                to="/ai-analysis"
                className="flex-1 py-3 px-6 rounded-lg font-medium text-center transition-colors duration-200 hover:bg-gray-100"
                style={{ 
                  color: colors.text.primary,
                  borderColor: colors.border.primary,
                  borderWidth: '1px',
                  textDecoration: 'none'
                }}
              >
                Try AI Search
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: colors.border.primary }}>
            <p 
              className="text-sm"
              style={{ color: colors.text.muted }}
            >
              Still can't find what you're looking for?{' '}
              <Link 
                to="/ai-analysis" 
                className="underline hover:no-underline"
                style={{ color: colors.primary.blue }}
              >
                Try our AI-powered search
              </Link>{' '}
              to find files and features across FileInASnap.
            </p>
          </div>

          {/* Developer Info (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div 
              className="mt-6 p-4 bg-yellow-50 rounded-lg text-left"
              style={{ borderColor: colors.semantic.warning }}
            >
              <h3 className="font-bold text-sm mb-2 text-yellow-800">
                Developer Info
              </h3>
              <div className="text-xs text-yellow-700">
                <p><strong>Path:</strong> {location.pathname}</p>
                <p><strong>Search:</strong> {location.search || 'None'}</p>
                <p><strong>Hash:</strong> {location.hash || 'None'}</p>
                <p><strong>State:</strong> {JSON.stringify(location.state) || 'None'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;