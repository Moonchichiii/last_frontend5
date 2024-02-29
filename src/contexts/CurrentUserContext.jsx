import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { axiosJson } from "../api/axiosConfig";
import Cookies from 'js-cookie'; 

// context for current user
export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(() => {});

const useCurrentUserProvider = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Function to refresh the authentication token
  const refreshAuthToken = async () => {
    try {
      const response = await axiosJson.post("/users/token/refresh/");
      if (response.status === 200) {
        setCurrentUser(response.data);
      }
    } catch (error) {
      setCurrentUser(null);
      throw error;
    }
  };

  // interceptor for refresh token
  const ResponseInterceptor = () => {
    return axiosJson.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.config.url === "/users/logout/") {
          return Promise.reject(error);
        }
  
        if (error.response?.status === 401 && error.config.url !== "/users/token/refresh/") {          
          try {
            const response = await refreshAuthToken();            
            setCurrentUser(response.data);            
            return axiosJson(error.config);
          } catch (refreshError) {            
            setCurrentUser(null);
            throw refreshError;
          }
        }        
        return Promise.reject(error); 
      }
    );
  };

  useEffect(() => {
    const interceptorId = ResponseInterceptor();
    return () => {
      axiosJson.interceptors.response.eject(interceptorId);
      setCurrentUser(null);
    };
  }, []);
  
  // Intercept requests and add access token to headers
  useEffect(() => {
    const requestInterceptor = axiosJson.interceptors.request.use((config) => {
      const accessToken = Cookies.get('access'); 
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; 
      }
      return config;
    });

    return () => {
      axiosJson.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // memorize context value
  const contextValue = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return contextValue;
};

export const CurrentUserProvider = ({ children }) => {
  const { currentUser, setCurrentUser } = useCurrentUserProvider();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

// Hooks for current user 
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
