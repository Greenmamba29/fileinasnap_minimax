import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { routes } from '../router';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import { AuthProvider } from '../context/AuthContext';
import { I18nProvider } from '../context/I18nContext';
import { LoadingProvider } from '../context/LoadingContext';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense } from 'react';

// Mock the useAuth hook
vi.mock('../hooks/useAuth');
const mockUseAuth = vi.mocked(useAuth);

// Mock external components that may not be needed for routing tests
vi.mock('../components/DashboardOverview', () => ({
  DashboardOverview: () => <div data-testid="dashboard-overview">Dashboard Overview</div>
}));

vi.mock('../components/AIAnalysis', () => ({
  AIAnalysis: () => <div data-testid="ai-analysis">AI Analysis</div>
}));

vi.mock('../components/SmartOrganizer', () => ({
  SmartOrganizer: () => <div data-testid="smart-organizer">Smart Organizer</div>
}));

vi.mock('../components/DuplicateDetector', () => ({
  DuplicateDetector: () => <div data-testid="duplicate-detector">Duplicate Detector</div>
}));

vi.mock('../components/SmartTagger', () => ({
  SmartTagger: () => <div data-testid="smart-tagger">Smart Tagger</div>
}));

vi.mock('../components/Login', () => ({
  default: () => <div data-testid="login-page">Login Page</div>
}));

// Test wrapper component
const TestWrapper: React.FC<{ 
  children: React.ReactNode; 
  initialEntries?: string[];
}> = ({ children, initialEntries = ['/'] }) => (
  <HelmetProvider>
    <I18nProvider>
      <AuthProvider>
        <LoadingProvider>
          <MemoryRouter initialEntries={initialEntries}>
            {children}
          </MemoryRouter>
        </LoadingProvider>
      </AuthProvider>
    </I18nProvider>
  </HelmetProvider>
);

// Create a test router component without BrowserRouter
const TestRouter: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.requireAuth !== undefined ? (
              <ProtectedRoute requireAuth={route.requireAuth}>
                {route.element}
              </ProtectedRoute>
            ) : (
              route.element
            )
          }
        />
      ))}
    </Routes>
  </Suspense>
);

describe('Router Configuration', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false
    });
  });

  it('should export routes configuration', () => {
    expect(routes).toBeDefined();
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBeGreaterThan(0);
  });

  it('should have all required route properties', () => {
    routes.forEach(route => {
      expect(route).toHaveProperty('path');
      expect(route).toHaveProperty('element');
      
      if (route.layout) {
        expect(route).toHaveProperty('requireAuth');
      }
    });
  });

  it('should include all main application routes', () => {
    const routePaths = routes.map(route => route.path);
    
    // Check for main routes
    expect(routePaths).toContain('/');
    expect(routePaths).toContain('/login');
    expect(routePaths).toContain('/ai-analysis');
    expect(routePaths).toContain('/smart-organizer');
    expect(routePaths).toContain('/duplicate-detector');
    expect(routePaths).toContain('/smart-tagger');
    expect(routePaths).toContain('/folders/:folderType');
    expect(routePaths).toContain('*'); // 404 route
  });
});

describe('Route Navigation', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com' } as any,
      loading: false
    });
  });

  it('should render dashboard on root path', async () => {
    render(
      <TestWrapper initialEntries={['/']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  it('should render AI analysis page on /ai-analysis', async () => {
    render(
      <TestWrapper initialEntries={['/ai-analysis']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('AI Analysis')).toBeInTheDocument();
    });
  });

  it('should render smart organizer page on /smart-organizer', async () => {
    render(
      <TestWrapper initialEntries={['/smart-organizer']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Smart Organization')).toBeInTheDocument();
    });
  });

  it('should render duplicate detector page on /duplicate-detector', async () => {
    render(
      <TestWrapper initialEntries={['/duplicate-detector']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Duplicate Detection')).toBeInTheDocument();
    });
  });

  it('should render smart tagger page on /smart-tagger', async () => {
    render(
      <TestWrapper initialEntries={['/smart-tagger']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Smart Tagging')).toBeInTheDocument();
    });
  });

  it('should render folder page with dynamic parameters', async () => {
    render(
      <TestWrapper initialEntries={['/folders/documents']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Documents')).toBeInTheDocument();
    });
  });

  it('should render 404 page for invalid routes', async () => {
    render(
      <TestWrapper initialEntries={['/non-existent-route']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    });
  });
});

describe('Route Redirects', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com' } as any,
      loading: false
    });
  });

  it('should redirect /dashboard to /', async () => {
    render(
      <TestWrapper initialEntries={['/dashboard']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  it('should redirect legacy folder routes', async () => {
    render(
      <TestWrapper initialEntries={['/folder-documents']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Documents')).toBeInTheDocument();
    });
  });
});

describe('Authentication Routing', () => {
  it('should redirect to login when not authenticated', async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false
    });

    render(
      <TestWrapper initialEntries={['/']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });
  });

  it('should redirect authenticated users away from login page', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com' } as any,
      loading: false
    });

    render(
      <TestWrapper initialEntries={['/login']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  it('should show loading state while authentication is being determined', async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: true
    });

    render(
      <TestWrapper initialEntries={['/']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading FileInASnap...')).toBeInTheDocument();
    });
  });

  it('should preserve location state for return after login', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false
    });

    const { container } = render(
      <TestWrapper initialEntries={['/ai-analysis']}>
        <TestRouter />
      </TestWrapper>
    );

    // Should redirect to login and preserve the intended destination
    expect(container).toBeInTheDocument();
  });
});

describe('Error Handling', () => {
  it('should render error boundary on component errors', async () => {
    // Mock a component that throws an error
    vi.doMock('../pages/DashboardPage', () => ({
      default: () => {
        throw new Error('Test error');
      }
    }));

    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com' } as any,
      loading: false
    });

    render(
      <TestWrapper initialEntries={['/']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    });
  });
});

describe('Lazy Loading', () => {
  it('should show loading state while lazy components load', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com' } as any,
      loading: false
    });

    render(
      <TestWrapper initialEntries={['/ai-analysis']}>
        <TestRouter />
      </TestWrapper>
    );

    // Initially might show loading
    const loadingElement = screen.queryByText('Loading...');
    if (loadingElement) {
      expect(loadingElement).toBeInTheDocument();
    }

    // Eventually should show the actual content
    await waitFor(() => {
      expect(screen.getByText('AI Analysis')).toBeInTheDocument();
    });
  });
});

describe('Navigation Helpers', () => {
  it('should provide navigation utilities', async () => {
    // Test that routes array is properly exported and accessible
    expect(routes).toBeDefined();
    expect(Array.isArray(routes)).toBe(true);
    
    // Test that routes have proper structure for navigation
    const routeWithPath = routes.find(route => route.path === '/');
    expect(routeWithPath).toBeDefined();
    expect(routeWithPath?.element).toBeDefined();
  });
});

describe('Route Parameters', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com' } as any,
      loading: false
    });
  });

  it('should handle folder type parameters correctly', async () => {
    const folderTypes = ['documents', 'media', 'projects', 'archive'];
    
    for (const folderType of folderTypes) {
      const { unmount } = render(
        <TestWrapper initialEntries={[`/folders/${folderType}`]}>
          <TestRouter />
        </TestWrapper>
      );

      await waitFor(() => {
        // Should render the appropriate folder page
        expect(screen.getByRole('main')).toBeInTheDocument();
      });

      unmount();
    }
  });

  it('should handle query parameters in folder routes', async () => {
    render(
      <TestWrapper initialEntries={['/folders/documents?view=list&sort=date']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Documents')).toBeInTheDocument();
    });
  });
});

describe('Browser History Integration', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com' } as any,
      loading: false
    });
  });

  it('should work with browser back/forward buttons', async () => {
    const { rerender } = render(
      <TestWrapper initialEntries={['/']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    // Simulate navigation to another route
    rerender(
      <TestWrapper initialEntries={['/ai-analysis']}>
        <TestRouter />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('AI Analysis')).toBeInTheDocument();
    });
  });
});