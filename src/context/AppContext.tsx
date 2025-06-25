'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  User
} from '../types';

interface AppContextType {
  userDetails: any | null;
  loggedUser: any | null;
  isLoadingUserDetails: boolean;
  userDetailsError: string | null;
  setLoggedUser: (user: any) => void;
  fetchUserProfile: () => Promise<any>;
  refreshUserDetails: () => Promise<void>;
  selectedServiceType: string[];
  setSelectedServiceType: (types: string[]) => void;
  isTokenValid: boolean;
  refreshToken: () => Promise<boolean>;
  performLogout: () => void
}

export const AppContext = createContext<AppContextType>({
  userDetails: null,
  loggedUser: null,
  isLoadingUserDetails: false,
  userDetailsError: null,
  setLoggedUser: () => { },
  fetchUserProfile: async () => ({}),
  refreshUserDetails: async () => { },
  selectedServiceType: [],
  setSelectedServiceType: () => { },
  isTokenValid: true,
  refreshToken: async () => false,
  performLogout: () => { }
});

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedUser, setLoggedUserState] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState<boolean>(false);
  const [userDetailsError, setUserDetailsError] = useState<string | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<string[]>([]);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(true);

  // Refs to manage intervals and prevent memory leaks
  const tokenCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastTokenCheckRef = useRef<number>(0);

  // Token validation interval (check every 30 seconds)
  const TOKEN_CHECK_INTERVAL = 30 * 1000;
  // Cache token validation for 2 minutes to avoid excessive API calls
  const TOKEN_CACHE_DURATION = 2 * 60 * 1000;

  // Function to validate token with the server
  const validateToken = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsTokenValid(false);
      return false;
    }

    try {
      const response = await fetch('https://mktmem-backend.onrender.com/api/users/profile/', {
        method: 'HEAD', // Use HEAD to check token without fetching full data
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        setIsTokenValid(true);
        return true;
      } else if (response.status === 401) {
        setIsTokenValid(false);
        return false;
      } else {
        // For other errors, assume token is still valid to avoid unnecessary logouts
        return true;
      }
    } catch (error) {
      console.error('Token validation error:', error);
      // On network errors, assume token is still valid
      return true;
    }
  }, []);

  // Function to refresh/renew token (if your backend supports it)
  const refreshToken = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      // Replace this endpoint with your actual token refresh endpoint
      const response = await fetch('https://mktmem-backend.onrender.com/api/auth/refresh-token/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          setIsTokenValid(true);
          return true;
        }
      }
    } catch (error) {
      console.error('Token refresh error:', error);
    }

    return false;
  }, []);

  // Enhanced logout function
  const performLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedUserState(null);
    setUserDetails(null);
    setUserDetailsError(null);
    setIsTokenValid(false);

    // Clear the token check interval
    if (tokenCheckIntervalRef.current) {
      clearInterval(tokenCheckIntervalRef.current);
      tokenCheckIntervalRef.current = null;
    }
  }, []);

  // Enhanced token check with caching
  const checkTokenValidity = useCallback(async () => {
    const now = Date.now();

    // Use cached result if recent check was performed
    if (now - lastTokenCheckRef.current < TOKEN_CACHE_DURATION) {
      return;
    }

    lastTokenCheckRef.current = now;

    const isValid = await validateToken();

    if (!isValid) {
      // Try to refresh token first
      const refreshed = await refreshToken();

      if (!refreshed) {
        console.log('Token expired and refresh failed. Logging out...');
        performLogout();
      }
    }
  }, [validateToken, refreshToken, performLogout]);

  // Memoized function to fetch user profile with better error handling
  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    setIsLoadingUserDetails(true);
    setUserDetailsError(null);

    try {
      const response = await fetch('https://mktmem-backend.onrender.com/api/users/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Try to refresh token before giving up
          const refreshed = await refreshToken();

          if (refreshed) {
            // Retry the request with new token
            const newToken = localStorage.getItem('token');
            const retryResponse = await fetch('https://mktmem-backend.onrender.com/api/users/profile/', {
              method: 'GET',
              headers: {
                'Authorization': `Token ${newToken}`,
                'Content-Type': 'application/json',
              },
            });

            if (retryResponse.ok) {
              const data = await retryResponse.json();
              setUserDetails(data);
              return data;
            }
          }

          // If refresh failed or retry failed, logout
          performLogout();
          throw new Error('Authentication expired. Please log in again.');
        }
        throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Profile fetched successfully!');
      setUserDetails(data);
      return data;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user profile';
      console.error('Profile fetch error:', errorMessage);
      setUserDetailsError(errorMessage);
      throw error;
    } finally {
      setIsLoadingUserDetails(false);
    }
  }, [refreshToken, performLogout]);

  // Function to refresh user details on demand
  const refreshUserDetails = useCallback(async () => {
    if (loggedUser) {
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error('Error refreshing user details:', error);
      }
    }
  }, [loggedUser, fetchUserProfile]);

  // Enhanced handler for setting logged user
  const handleSetLoggedUser = useCallback((user: any) => {
    setLoggedUserState(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsTokenValid(true);

      // Start token checking when user logs in
      if (tokenCheckIntervalRef.current) {
        clearInterval(tokenCheckIntervalRef.current);
      }

      tokenCheckIntervalRef.current = setInterval(checkTokenValidity, TOKEN_CHECK_INTERVAL);
    } else {
      performLogout();
    }
  }, [checkTokenValidity, performLogout]);

  // Initialize logged user from localStorage on mount
  useEffect(() => {
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (currentUser && token) {
      try {
        const parsedUser = JSON.parse(currentUser);
        setLoggedUserState(parsedUser);
        setIsTokenValid(true);

        // Start token checking
        tokenCheckIntervalRef.current = setInterval(checkTokenValidity, TOKEN_CHECK_INTERVAL);

        // Perform initial token check
        checkTokenValidity();
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        performLogout();
      }
    }

    // Cleanup interval on unmount
    return () => {
      if (tokenCheckIntervalRef.current) {
        clearInterval(tokenCheckIntervalRef.current);
      }
    };
  }, [checkTokenValidity, performLogout]);

  // Fetch user profile when logged user changes
  useEffect(() => {
    if (loggedUser && isTokenValid) {
      fetchUserProfile().catch(error => {
        console.error('Error fetching user profile on login:', error);
      });
    } else if (!loggedUser) {
      setUserDetails(null);
      setUserDetailsError(null);
    }
  }, [loggedUser, fetchUserProfile, isTokenValid]);

  // Add event listener for storage changes (multi-tab support)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' && !e.newValue) {
        // Token was removed in another tab
        performLogout();
      } else if (e.key === 'user' && !e.newValue) {
        // User was removed in another tab
        performLogout();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [performLogout]);

  // Add visibility change listener to check token when tab becomes active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && loggedUser) {
        checkTokenValidity();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkTokenValidity, loggedUser]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    userDetails,
    loggedUser,
    isLoadingUserDetails,
    userDetailsError,
    setLoggedUser: handleSetLoggedUser,
    fetchUserProfile,
    refreshUserDetails,
    selectedServiceType,
    setSelectedServiceType,
    isTokenValid,
    refreshToken,
    performLogout
  }), [
    userDetails,
    loggedUser,
    isLoadingUserDetails,
    userDetailsError,
    handleSetLoggedUser,
    fetchUserProfile,
    refreshUserDetails,
    selectedServiceType,
    setSelectedServiceType,
    isTokenValid,
    refreshToken,
    performLogout
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};