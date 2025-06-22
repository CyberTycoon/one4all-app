'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
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
});

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState<boolean>(false);
  const [userDetailsError, setUserDetailsError] = useState<string | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<string[]>([]);


  // Memoized function to fetch user profile
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
          // Token is invalid or expired
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setLoggedUser(null);
          setUserDetails(null);
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
  }, []);

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

  // Initialize logged user from localStorage on mount
  useEffect(() => {
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (currentUser && token) {
      try {
        const parsedUser = JSON.parse(currentUser);
        setLoggedUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  useEffect(() => {
    if (loggedUser) {
      fetchUserProfile().catch(error => {
        console.error('Error fetching user profile on login:', error);
      });
    } else {
      setUserDetails(null);
      setUserDetailsError(null);
    }
  }, [loggedUser, fetchUserProfile]);

  useEffect(() => {
    console.log("Context updated:", selectedServiceType);
  }, [selectedServiceType]);


  const handleSetLoggedUser = useCallback((user: any) => {
    setLoggedUser(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUserDetails(null);
      setUserDetailsError(null);
    }
  }, []);




  return (
    <AppContext.Provider value={{
      userDetails,
      loggedUser,
      isLoadingUserDetails,
      userDetailsError,
      setLoggedUser: handleSetLoggedUser,
      fetchUserProfile,
      refreshUserDetails,
      selectedServiceType,
      setSelectedServiceType,
    }}>
      {children}
    </AppContext.Provider>
  );
};