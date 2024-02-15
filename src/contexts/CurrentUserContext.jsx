import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosJson } from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(() => {});
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

const refreshTokenEndpoint = "/token/refresh/";
const currentUserEndpoint = "/users/";

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Function to refresh the token
  const refreshToken = async () => {
    try {
      const response = await axiosJson.post(refreshTokenEndpoint);
      axiosJson.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      fetchCurrentUser();
    } catch (error) {
      navigate("/signin");
    }
  };

  // Function to fetch current user data
  const fetchCurrentUser = async () => {
    try {
      const response = await axiosJson.get(currentUserEndpoint);
      setCurrentUser(response.data);
    } catch (error) {
      if (error.response?.status === 401 && currentUser === null) {
        await refreshToken();
      } else {
        console.error("Error fetching current user:", error);
      }
    }
  };

  useEffect(() => {
    fetchCurrentUser();

    // axios interceptor
    const interceptor = axiosJson.interceptors.response.use(
      (response) => response,
      async (error) => {
        // unauthorized
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true;
          try {
            await refreshToken();
            return axiosJson(error.config);
          } catch (refreshError) {
            navigate("/signin");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // remove interceptor on components unmounts
    return () => {
      axiosJson.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
