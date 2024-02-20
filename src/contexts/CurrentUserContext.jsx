import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosJson } from "../api/axiosConfig";

// No changes in the creation of your contexts
export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(() => {});

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // Function to refresh the authentication token
    const refreshAuthToken = async () => {
        try {
            const response = await axiosJson.post('/users/token/refresh/', {}, { withCredentials: true });
            if (response.status === 200) {
                console.log('Token refreshed successfully');
                setCurrentUser(updatedUserInfo);
            }
        } catch (error) {
            console.error('Token refresh failed:', error);            
            setCurrentUser(null); 
        }
    };

    // Effect to set up a periodic token refresh
    useEffect(() => {
        const intervalId = setInterval(refreshAuthToken, 1000 * 60 * 15); 
        return () => clearInterval(intervalId);
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};


export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
