import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosFormData } from "../api/axiosConfig";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; 

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext(() => {});

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const currentUser = useContext(CurrentUserContext); 
  const [profileData, setProfileData] = useState({
    profiles: [],
    popularProfiles: []
  });

  useEffect(() => {
    
    if (currentUser) {
      const fetchProfiles = async () => {
        try {
          console.log("Fetching profiles...");
          const response = await axiosFormData.get("/api/profiles/");
          console.log("Profiles fetched:", response.data);
          setProfileData((prevState) => ({
            ...prevState,
            profiles: response.data
          }));
        } catch (error) {
          console.error("Error fetching profiles:", error);
        }
      };

      fetchProfiles();
    } else {
      
      setProfileData({
        profiles: [],
        popularProfiles: []
      });
    }
  }, [currentUser]); 

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
