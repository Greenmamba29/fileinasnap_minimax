import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import { AuthProvider } from '../context/AuthContext';
import { I18nProvider } from '../context/I18nContext';
import { LoadingProvider } from '../context/LoadingContext';
import { HelmetProvider } from 'react-helmet-async';

// Mock the useAuth hook
vi.mock('../hooks/useAuth');
const mockUseAuth = vi.mocked(useAuth);

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to, state, replace }: any) => {
      mockNavigate(to, { state, replace });
      return <div data-testid="navigate" data-to={to} />;
    }
  };
});

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

// Mock child component for testing
const TestComponent = () => <div data-testid="protected-content">Protected Content</div>;

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Loading State', () => {
    it('should show loading spinner when authentication is being determined', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        loading: true
      });

      render(
        <TestWrapper>
          <ProtectedRoute requireAuth={true}>
            <TestComponent />
          </ProtectedRoute>
        </TestWrapper>
      );

      expect(screen.getByText('Loading FileInASnap...')).toBeInTheDocument();
    });
  });

  describe('Authentication Required', () => {
    it('should render children when user is authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', email: 'test@example.com' } as any,
        loading: false
      });

      render(
        <TestWrapper>
          <ProtectedRoute requireAuth={true}>
            <TestComponent />
          </ProtectedRoute>
        </TestWrapper>
      );

      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });

    it('should redirect to login when user is not authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        loading: false
      });

      render(
        <TestWrapper initialEntries={['/dashboard']}>
          <ProtectedRoute requireAuth={true}>
            <TestComponent />
          </ProtectedRoute>
        </TestWrapper>
      );

      expect(mockNavigate).toHaveBeenCalledWith('/login', {
        state: { from: '/dashboard' },
        replace: true
      });
    });
  });
});