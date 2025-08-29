import { useMemo, useCallback } from 'react';
import { 
  useLocation, 
  useNavigate, 
  useSearchParams, 
  useParams 
} from 'react-router-dom';

interface RouteParamsHook {
  // URL Parameters
  params: Record<string, string | undefined>;
  getParam: (key: string) => string | undefined;
  
  // Query Parameters
  queryParams: Record<string, string>;
  getQueryParam: (key: string, defaultValue?: string) => string;
  setQueryParam: (key: string, value: string | null) => void;
  setQueryParams: (params: Record<string, string | null>) => void;
  clearQueryParams: () => void;
  
  // Navigation with parameters
  navigateWithParams: (path: string, queryParams?: Record<string, string>) => void;
  updateURL: (updates: { path?: string; queryParams?: Record<string, string | null> }) => void;
  
  // Current location info
  pathname: string;
  search: string;
  hash: string;
  state: any;
}

export const useRouteParams = (): RouteParamsHook => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  // Convert URLSearchParams to regular object
  const queryParams = useMemo(() => {
    const result: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }, [searchParams]);

  // Get single URL parameter
  const getParam = useCallback((key: string): string | undefined => {
    return params[key];
  }, [params]);

  // Get single query parameter with optional default
  const getQueryParam = useCallback((
    key: string, 
    defaultValue: string = ''
  ): string => {
    return searchParams.get(key) || defaultValue;
  }, [searchParams]);

  // Set single query parameter
  const setQueryParam = useCallback((key: string, value: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (value === null || value === '') {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }
    
    setSearchParams(newSearchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  // Set multiple query parameters
  const setQueryParams = useCallback((updates: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    
    setSearchParams(newSearchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  // Clear all query parameters
  const clearQueryParams = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Navigate to path with query parameters
  const navigateWithParams = useCallback((
    path: string, 
    newQueryParams?: Record<string, string>
  ) => {
    const url = new URL(path, window.location.origin);
    
    if (newQueryParams) {
      Object.entries(newQueryParams).forEach(([key, value]) => {
        if (value) {
          url.searchParams.set(key, value);
        }
      });
    }
    
    navigate(`${url.pathname}${url.search}`, { replace: false });
  }, [navigate]);

  // Update current URL with path and/or query parameter changes
  const updateURL = useCallback((updates: { 
    path?: string; 
    queryParams?: Record<string, string | null> 
  }) => {
    const { path, queryParams: newQueryParams } = updates;
    
    if (newQueryParams) {
      const updatedSearchParams = new URLSearchParams(searchParams);
      
      Object.entries(newQueryParams).forEach(([key, value]) => {
        if (value === null || value === '') {
          updatedSearchParams.delete(key);
        } else {
          updatedSearchParams.set(key, value);
        }
      });
      
      const newPath = path || location.pathname;
      const newSearch = updatedSearchParams.toString();
      const newURL = newSearch ? `${newPath}?${newSearch}` : newPath;
      
      navigate(newURL, { replace: true });
    } else if (path) {
      navigate(`${path}${location.search}`, { replace: true });
    }
  }, [searchParams, location.pathname, location.search, navigate]);

  return {
    // URL Parameters
    params,
    getParam,
    
    // Query Parameters
    queryParams,
    getQueryParam,
    setQueryParam,
    setQueryParams,
    clearQueryParams,
    
    // Navigation
    navigateWithParams,
    updateURL,
    
    // Location info
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    state: location.state
  };
};

// Specialized hook for folder navigation
export const useFolderNavigation = () => {
  const { 
    getQueryParam, 
    setQueryParams, 
    navigateWithParams 
  } = useRouteParams();

  const view = getQueryParam('view', 'grid');
  const sort = getQueryParam('sort', 'name');
  const filter = getQueryParam('filter', '');
  const page = parseInt(getQueryParam('page', '1'), 10);

  const setView = useCallback((newView: string) => {
    setQueryParams({ view: newView });
  }, [setQueryParams]);

  const setSort = useCallback((newSort: string) => {
    setQueryParams({ sort: newSort });
  }, [setQueryParams]);

  const setFilter = useCallback((newFilter: string) => {
    setQueryParams({ filter: newFilter || null, page: '1' });
  }, [setQueryParams]);

  const setPage = useCallback((newPage: number) => {
    setQueryParams({ page: newPage.toString() });
  }, [setQueryParams]);

  const navigateToFolder = useCallback((folderType: string, options?: {
    view?: string;
    sort?: string;
    filter?: string;
  }) => {
    navigateWithParams(`/folders/${folderType}`, {
      view: options?.view || view,
      sort: options?.sort || sort,
      filter: options?.filter || filter
    });
  }, [navigateWithParams, view, sort, filter]);

  return {
    view,
    sort,
    filter,
    page,
    setView,
    setSort,
    setFilter,
    setPage,
    navigateToFolder
  };
};

// Specialized hook for search functionality
export const useRouteSearch = () => {
  const { getQueryParam, setQueryParam } = useRouteParams();

  const searchQuery = getQueryParam('q', '');
  const searchType = getQueryParam('type', 'all');

  const setSearchQuery = useCallback((query: string) => {
    setQueryParam('q', query || null);
  }, [setQueryParam]);

  const setSearchType = useCallback((type: string) => {
    setQueryParam('type', type);
  }, [setQueryParam]);

  const clearSearch = useCallback(() => {
    setQueryParam('q', null);
    setQueryParam('type', null);
  }, [setQueryParam]);

  return {
    searchQuery,
    searchType,
    setSearchQuery,
    setSearchType,
    clearSearch
  };
};

export default useRouteParams;