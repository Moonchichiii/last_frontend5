import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { axiosJson } from "../api/axiosConfig";
import Cookies from 'js-cookie';

// context for current user
export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(() => {});


const useCurrentUserProvider = () => {
  
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
    userId: null, 
  });

  // Function to refresh the authentication token
  const refreshAuthToken = async () => {
    try {
      const response = await axiosJson.post("/users/token/refresh/");
      if (response.status === 200) {
        
        setCurrentUser({ 
          isLoggedIn: true, 
          userId: response.data.userId 
        });
      }
    } catch (error) {
      setCurrentUser({ isLoggedIn: false, userId: null });
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

  // Intercept requests and conditionally add access token to headers
  useEffect(() => {
    const requestInterceptor = axiosJson.interceptors.request.use((config) => {
      
      if (!config.url.includes("/users/register/") && !config.url.includes("/users/login/")) {
        const accessToken = Cookies.get('access');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }
      return config;
    });

    return () => {
      axiosJson.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // Memorize context value
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

// Hooks for current context  
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);



