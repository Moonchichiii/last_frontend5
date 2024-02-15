import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosFormData } from "../api/axiosConfig";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext(() => {});

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    profiles: [],
    popularProfiles: []
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axiosFormData.get("/profiles/");
        setProfileData((prevState) => ({
          ...prevState,
          profiles: response.data
        }));
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
