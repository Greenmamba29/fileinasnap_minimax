import { useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AccessibleRoutingHook {
  announceRouteChange: (message?: string) => void;
  focusMainContent: () => void;
  skipToContent: () => void;
  setPageTitle: (title: string) => void;
}

export const useAccessibleRouting = (): AccessibleRoutingHook => {
  const location = useLocation();
  const navigate = useNavigate();
  const announcementRef = useRef<HTMLDivElement>(null);
  const previousPath = useRef<string>('');

  // Create live region for announcements if it doesn't exist
  useEffect(() => {
    if (!document.getElementById('route-announcer')) {
      const announcer = document.createElement('div');
      announcer.id = 'route-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.position = 'absolute';
      announcer.style.left = '-10000px';
      announcer.style.width = '1px';
      announcer.style.height = '1px';
      announcer.style.overflow = 'hidden';
      document.body.appendChild(announcer);
    }
  }, []);

  // Announce route changes
  const announceRouteChange = useCallback((customMessage?: string) => {
    const announcer = document.getElementById('route-announcer');
    if (announcer) {
      const message = customMessage || `Navigated to ${document.title}`;
      announcer.textContent = message;
    }
  }, []);

  // Focus management for route changes
  const focusMainContent = useCallback(() => {
    // First try to focus main content
    const mainContent = document.querySelector('main[role="main"]') as HTMLElement;
    if (mainContent) {
      mainContent.focus({ preventScroll: false });
      return;
    }

    // Fallback to first heading
    const firstHeading = document.querySelector('h1, h2, h3') as HTMLElement;
    if (firstHeading) {
      firstHeading.focus({ preventScroll: false });
      return;
    }

    // Final fallback to body
    document.body.focus();
  }, []);

  // Skip to content functionality
  const skipToContent = useCallback(() => {
    const skipLink = document.getElementById('skip-to-content');
    const mainContent = document.querySelector('main[role="main"]') as HTMLElement;
    
    if (mainContent) {
      mainContent.focus({ preventScroll: false });
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Set page title with proper formatting
  const setPageTitle = useCallback((title: string) => {
    document.title = title.includes('FileInASnap') 
      ? title 
      : `${title} - FileInASnap`;
  }, []);

  // Handle route changes
  useEffect(() => {
    // Skip if this is the initial load
    if (previousPath.current === '') {
      previousPath.current = location.pathname;
      return;
    }

    // Only handle if the path actually changed
    if (previousPath.current !== location.pathname) {
      // Focus main content after route change
      const timeoutId = setTimeout(() => {
        focusMainContent();
        
        // Announce the route change
        announceRouteChange();
      }, 100); // Small delay to ensure DOM updates

      previousPath.current = location.pathname;

      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, focusMainContent, announceRouteChange]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle skip to content (typically activated with Tab from skip link)
      if (event.target instanceof HTMLElement && 
          event.target.textContent?.includes('Skip to content') &&
          event.key === 'Enter') {
        event.preventDefault();
        skipToContent();
      }

      // Handle escape key for modal/overlay dismissal
      if (event.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (
          activeElement.closest('[role="dialog"]') ||
          activeElement.closest('[role="menu"]') ||
          activeElement.closest('.mobile-sidebar')
        )) {
          // Let parent components handle escape
          return;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [skipToContent]);

  return {
    announceRouteChange,
    focusMainContent,
    skipToContent,
    setPageTitle
  };
};

// Hook for managing focus traps in modals/overlays
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus first element when trap activates
    firstElement?.focus();

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isActive]);

  return containerRef;
};

export default useAccessibleRouting;