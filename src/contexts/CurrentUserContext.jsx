import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosJson } from './api/axiosConfig';
import { useHistory } from 'react-router-dom';

export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(() => {});

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);


const refreshTokenEndpoint = '/users/token/refresh/';  
const currentUserEndpoint = '/users/users/';


export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  // Function to refresh the token
  const refreshToken = async () => {
    try {
      const response = await axiosJson.post(refreshTokenEndpoint);
      axiosJson.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      
      fetchCurrentUser();
    } catch (error) {
      
      history.push('/signin');
    }
  };



  // Function to fetch current user data
  const fetchCurrentUser = async () => {
    try {
      const response = await axiosJson.get(currentUserEndpoint);
      setCurrentUser(response.data);
    } catch (error) {
      
      if (error.response?.status === 401) {
        await refreshToken();
      } else {
        console.error('Error fetching current user:', error);
      }
    }
  };

  // Fetch current user data on mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
