import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { RouteErrorBoundary } from '../components/RouteErrorBoundary';
import { NavigationProgress } from '../components/NavigationProgress';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';

// Lazy load page components for optimal performance
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const AIAnalysisPage = lazy(() => import('../pages/AIAnalysisPage'));
const SmartOrganizerPage = lazy(() => import('../pages/SmartOrganizerPage'));
const DuplicateDetectorPage = lazy(() => import('../pages/DuplicateDetectorPage'));
const SmartTaggerPage = lazy(() => import('../pages/SmartTaggerPage'));
const FolderPage = lazy(() => import('../pages/FolderPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const LoginPage = lazy(() => import('../components/Login'));

// Loading fallback component
const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <NavigationProgress />
      <p className="mt-4 text-lg text-gray-600">Loading...</p>
    </div>
  </div>
);

// Higher-order component for lazy route loading with error boundary
const LazyRoute: React.FC<{ 
  component: React.LazyExoticComponent<React.ComponentType<any>>; 
  [key: string]: any; 
}> = ({ component: Component, ...props }) => (
  <RouteErrorBoundary>
    <Suspense fallback={<RouteLoadingFallback />}>
      <Component {...props} />
    </Suspense>
  </RouteErrorBoundary>
);

// Route definitions with authentication requirements
const routes = [
  // Authentication routes (public)
  {
    path: '/login',
    element: <LazyRoute component={LoginPage} />,
    layout: AuthLayout,
    requireAuth: false,
    title: 'Login - FileInASnap'
  },
  
  // Main application routes (protected)
  {
    path: '/',
    element: <LazyRoute component={DashboardPage} />,
    layout: MainLayout,
    requireAuth: true,
    title: 'Dashboard - FileInASnap'
  },
  {
    path: '/dashboard',
    element: <Navigate to="/" replace />,
    layout: MainLayout,
    requireAuth: true,
    title: 'Dashboard - FileInASnap'
  },
  
  // AI Features routes
  {
    path: '/ai-analysis',
    element: <LazyRoute component={AIAnalysisPage} />,
    layout: MainLayout,
    requireAuth: true,
    title: 'AI Analysis - FileInASnap'
  },
  {
    path: '/smart-organizer',
    element: <LazyRoute component={SmartOrganizerPage} />,
    layout: MainLayout,
    requireAuth: true,
    title: 'Smart Organizer - FileInASnap'
  },
  {
    path: '/duplicate-detector',
    element: <LazyRoute component={DuplicateDetectorPage} />,
    layout: MainLayout,
    requireAuth: true,
    title: 'Duplicate Detector - FileInASnap'
  },
  {
    path: '/smart-tagger',
    element: <LazyRoute component={SmartTaggerPage} />,
    layout: MainLayout,
    requireAuth: true,
    title: 'Smart Tagger - FileInASnap'
  },
  
  // Folder routes with dynamic parameters
  {
    path: '/folders/:folderType',
    element: <LazyRoute component={FolderPage} />,
    layout: MainLayout,
    requireAuth: true,
    title: 'Folder - FileInASnap'
  },
  
  // Legacy route redirects for backward compatibility
  {
    path: '/insights',
    element: <Navigate to="/dashboard" replace />,
    layout: MainLayout,
    requireAuth: true
  },
  {
    path: '/history',
    element: <Navigate to="/dashboard" replace />,
    layout: MainLayout,
    requireAuth: true
  },
  {
    path: '/activity',
    element: <Navigate to="/dashboard" replace />,
    layout: MainLayout,
    requireAuth: true
  },
  {
    path: '/ai-dashboard',
    element: <Navigate to="/" replace />,
    layout: MainLayout,
    requireAuth: true
  },
  
  // Folder-specific redirects
  {
    path: '/folder-documents',
    element: <Navigate to="/folders/documents" replace />,
    layout: MainLayout,
    requireAuth: true
  },
  {
    path: '/folder-media',
    element: <Navigate to="/folders/media" replace />,
    layout: MainLayout,
    requireAuth: true
  },
  {
    path: '/folder-projects',
    element: <Navigate to="/folders/projects" replace />,
    layout: MainLayout,
    requireAuth: true
  },
  {
    path: '/folder-archive',
    element: <Navigate to="/folders/archive" replace />,
    layout: MainLayout,
    requireAuth: true
  },
  
  // 404 fallback
  {
    path: '*',
    element: <LazyRoute component={NotFoundPage} />,
    layout: MainLayout,
    requireAuth: false,
    title: 'Page Not Found - FileInASnap'
  }
];

// Document title management hook
const useDocumentTitle = (title: string) => {
  React.useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};

// Route component wrapper with layout and title management
const RouteWrapper: React.FC<{
  children: React.ReactNode;
  layout: React.ComponentType<{ children: React.ReactNode }>;
  title?: string;
  requireAuth: boolean;
}> = ({ children, layout: Layout, title, requireAuth }) => {
  useDocumentTitle(title || 'FileInASnap');
  
  return (
    <ProtectedRoute requireAuth={requireAuth}>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
};

// Main router component
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RouteErrorBoundary>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.layout ? (
                  <RouteWrapper
                    layout={route.layout}
                    title={route.title}
                    requireAuth={route.requireAuth}
                  >
                    {route.element}
                  </RouteWrapper>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </RouteErrorBoundary>
    </BrowserRouter>
  );
};

// Export route configuration for testing and navigation
export { routes };

// Navigation helpers
export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigateTo = React.useCallback((path: string, options?: { 
    replace?: boolean; 
    state?: any;
    preserveQuery?: boolean; 
  }) => {
    const finalPath = options?.preserveQuery && location.search 
      ? `${path}${location.search}` 
      : path;
    
    navigate(finalPath, {
      replace: options?.replace,
      state: options?.state
    });
  }, [navigate, location.search]);
  
  const goBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);
  
  const goForward = React.useCallback(() => {
    navigate(1);
  }, [navigate]);
  
  return {
    navigateTo,
    goBack,
    goForward,
    currentPath: location.pathname,
    currentSearch: location.search,
    currentState: location.state
  };
};

export default AppRouter;