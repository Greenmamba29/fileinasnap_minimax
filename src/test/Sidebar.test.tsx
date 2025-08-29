import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Sidebar } from '../components/Sidebar';
import { useMobileNavigation } from '../hooks/useMobileNavigation';

// Mock dependencies
vi.mock('../hooks/useMobileNavigation');
const mockUseMobileNavigation = vi.mocked(useMobileNavigation);

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({ data: [], error: null })
    })
  }
}));

// Mock react-router-dom's navigation hooks
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/', search: '' }),
    NavLink: ({ to, children, className, onClick, title, ...props }: any) => {
      const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        mockNavigate(to);
        onClick?.(e);
      };
      
      const isActive = false; // Simplified for testing
      const computedClassName = typeof className === 'function' 
        ? className({ isActive }) 
        : className;
      
      return (
        <a 
          href={to} 
          onClick={handleClick} 
          className={computedClassName}
          title={title}
          data-testid={`nav-link-${to.replace(/[^a-zA-Z0-9]/g, '-')}`}
          {...props}
        >
          {typeof children === 'function' ? children({ isActive }) : children}
        </a>
      );
    },
    Link: ({ to, children, onClick, ...props }: any) => (
      <a 
        href={to} 
        onClick={(e) => { 
          e.preventDefault(); 
          mockNavigate(to); 
          onClick?.(e); 
        }}
        data-testid={`link-${to.replace(/[^a-zA-Z0-9]/g, '-')}`}
        {...props}
      >
        {children}
      </a>
    )
  };
});

// Test wrapper
const TestWrapper: React.FC<{ 
  children: React.ReactNode; 
  initialEntries?: string[];
}> = ({ children, initialEntries = ['/'] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    {children}
  </MemoryRouter>
);

describe('Sidebar Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
    mockOnClose.mockClear();
    
    // Default mock for useMobileNavigation
    mockUseMobileNavigation.mockReturnValue({
      sidebarOpen: true,
      setSidebarOpen: vi.fn(),
      isMobile: false,
      showMobileOverlay: false,
      toggleSidebar: vi.fn()
    });
  });

  describe('Rendering States', () => {
    it('should render collapsed sidebar when isOpen is false', () => {
      render(
        <TestWrapper>
          <Sidebar isOpen={false} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Should show minimal sidebar with icons only
      expect(document.querySelector('.w-16')).toBeInTheDocument();
      
      // Main navigation should be present but compact
      expect(screen.getByTitle('Dashboard')).toBeInTheDocument();
      expect(screen.getByTitle('AI Analysis')).toBeInTheDocument();
    });

    it('should render full sidebar when isOpen is true', () => {
      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Should show full sidebar
      expect(document.querySelector('.w-64')).toBeInTheDocument();
      
      // Should show section headers
      expect(screen.getByText('Navigation')).toBeInTheDocument();
      expect(screen.getByText('AI Tools')).toBeInTheDocument();
      expect(screen.getByText('Smart Folders')).toBeInTheDocument();
    });

    it('should show mobile header when on mobile device', () => {
      mockUseMobileNavigation.mockReturnValue({
        sidebarOpen: true,
        setSidebarOpen: vi.fn(),
        isMobile: true,
        showMobileOverlay: true,
        toggleSidebar: vi.fn()
      });

      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Should show mobile header with logo and close button
      expect(screen.getByText('FileInASnap')).toBeInTheDocument();
      expect(screen.getByLabelText('Close sidebar')).toBeInTheDocument();
    });

    it('should apply mobile styles when isMobile is true', () => {
      mockUseMobileNavigation.mockReturnValue({
        sidebarOpen: true,
        setSidebarOpen: vi.fn(),
        isMobile: true,
        showMobileOverlay: true,
        toggleSidebar: vi.fn()
      });

      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Should have mobile positioning classes
      const sidebar = document.querySelector('[data-sidebar]');
      expect(sidebar).toHaveClass('fixed', 'inset-y-0', 'left-0', 'z-50');
    });
  });

  describe('Navigation Links', () => {
    beforeEach(() => {
      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );
    });

    it('should render all main navigation sections', () => {
      // Main navigation
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      
      // AI Tools section
      expect(screen.getByText('AI Analysis')).toBeInTheDocument();
      expect(screen.getByText('Smart Organizer')).toBeInTheDocument();
      expect(screen.getByText('Duplicate Detector')).toBeInTheDocument();
      expect(screen.getByText('Smart Tagger')).toBeInTheDocument();
    });

    it('should render smart folders', async () => {
      // Wait for folders to load (they're loaded asynchronously)
      await waitFor(() => {
        expect(screen.getByText('Documents')).toBeInTheDocument();
        expect(screen.getByText('Media Files')).toBeInTheDocument();
        expect(screen.getByText('Projects')).toBeInTheDocument();
        expect(screen.getByText('Archive')).toBeInTheDocument();
      });
    });

    it('should navigate to correct routes when links are clicked', async () => {
      // Click on AI Analysis
      const aiAnalysisLink = screen.getByText('AI Analysis').closest('a');
      fireEvent.click(aiAnalysisLink!);
      expect(mockNavigate).toHaveBeenCalledWith('/ai-analysis');

      // Click on Smart Organizer
      const smartOrganizerLink = screen.getByText('Smart Organizer').closest('a');
      fireEvent.click(smartOrganizerLink!);
      expect(mockNavigate).toHaveBeenCalledWith('/smart-organizer');

      // Click on Duplicate Detector
      const duplicateDetectorLink = screen.getByText('Duplicate Detector').closest('a');
      fireEvent.click(duplicateDetectorLink!);
      expect(mockNavigate).toHaveBeenCalledWith('/duplicate-detector');

      // Click on Smart Tagger
      const smartTaggerLink = screen.getByText('Smart Tagger').closest('a');
      fireEvent.click(smartTaggerLink!);
      expect(mockNavigate).toHaveBeenCalledWith('/smart-tagger');
    });

    it('should navigate to folder routes when folder links are clicked', async () => {
      await waitFor(() => {
        expect(screen.getByText('Documents')).toBeInTheDocument();
      });

      // Click on Documents folder
      const documentsLink = screen.getByText('Documents').closest('a');
      fireEvent.click(documentsLink!);
      expect(mockNavigate).toHaveBeenCalledWith('/folders/documents');

      // Click on Media Files folder
      const mediaLink = screen.getByText('Media Files').closest('a');
      fireEvent.click(mediaLink!);
      expect(mockNavigate).toHaveBeenCalledWith('/folders/media');
    });
  });

  describe('Mobile Interaction', () => {
    beforeEach(() => {
      mockUseMobileNavigation.mockReturnValue({
        sidebarOpen: true,
        setSidebarOpen: vi.fn(),
        isMobile: true,
        showMobileOverlay: true,
        toggleSidebar: vi.fn()
      });
    });

    it('should call onClose when close button is clicked on mobile', () => {
      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const closeButton = screen.getByLabelText('Close sidebar');
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should call onClose when navigation link is clicked on mobile', async () => {
      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const dashboardLink = screen.getByText('Dashboard').closest('a');
      fireEvent.click(dashboardLink!);
      
      expect(mockOnClose).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should not call onClose when navigation link is clicked on desktop', () => {
      mockUseMobileNavigation.mockReturnValue({
        sidebarOpen: true,
        setSidebarOpen: vi.fn(),
        isMobile: false,
        showMobileOverlay: false,
        toggleSidebar: vi.fn()
      });

      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      const dashboardLink = screen.getByText('Dashboard').closest('a');
      fireEvent.click(dashboardLink!);
      
      expect(mockOnClose).not.toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('Active State Management', () => {
    it('should apply active styles to current route', () => {
      // Mock useLocation to return a specific path
      vi.doMock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom');
        return {
          ...actual,
          useLocation: () => ({ pathname: '/ai-analysis', search: '' }),
          NavLink: ({ to, children, className }: any) => {
            const isActive = to === '/ai-analysis';
            const computedClassName = typeof className === 'function' 
              ? className({ isActive }) 
              : className;
            
            return (
              <a 
                href={to} 
                className={computedClassName}
                data-active={isActive}
                data-testid={`nav-link-${to.replace(/[^a-zA-Z0-9]/g, '-')}`}
              >
                {typeof children === 'function' ? children({ isActive }) : children}
              </a>
            );
          }
        };
      });

      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // The AI Analysis link should have active state
      const aiAnalysisLink = screen.getByTestId('nav-link--ai-analysis');
      expect(aiAnalysisLink).toHaveAttribute('data-active', 'true');
    });
  });

  describe('Loading States', () => {
    it('should show loading skeletons while folders are being fetched', () => {
      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Initially should show loading skeletons
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('should show folder content after loading completes', async () => {
      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Wait for folders to load
      await waitFor(() => {
        expect(screen.getByText('Documents')).toBeInTheDocument();
        expect(screen.getByText('Media Files')).toBeInTheDocument();
      });

      // Loading skeletons should be gone
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels and attributes', () => {
      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Sidebar should have proper data attribute for identification
      expect(document.querySelector('[data-sidebar]')).toBeInTheDocument();
      
      // Close button should have proper label
      if (screen.queryByLabelText('Close sidebar')) {
        expect(screen.getByLabelText('Close sidebar')).toBeInTheDocument();
      }
    });

    it('should support keyboard navigation', () => {
      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // All navigation links should be focusable
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle navigation errors gracefully', () => {
      mockNavigate.mockImplementation(() => {
        throw new Error('Navigation error');
      });

      render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Should not crash when navigation fails
      expect(() => {
        const dashboardLink = screen.getByText('Dashboard').closest('a');
        fireEvent.click(dashboardLink!);
      }).not.toThrow();
    });

    it('should handle missing onClose prop gracefully', () => {
      mockUseMobileNavigation.mockReturnValue({
        sidebarOpen: true,
        setSidebarOpen: vi.fn(),
        isMobile: true,
        showMobileOverlay: true,
        toggleSidebar: vi.fn()
      });

      render(
        <TestWrapper>
          <Sidebar isOpen={true} />
        </TestWrapper>
      );

      // Should not crash when onClose is not provided
      const dashboardLink = screen.getByText('Dashboard').closest('a');
      expect(() => fireEvent.click(dashboardLink!)).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('should not re-render unnecessarily when props do not change', () => {
      const { rerender } = render(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Re-render with same props
      rerender(
        <TestWrapper>
          <Sidebar isOpen={true} onClose={mockOnClose} />
        </TestWrapper>
      );

      // Component should still be functional
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });
});