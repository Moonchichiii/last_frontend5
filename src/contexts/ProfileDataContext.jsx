 import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosJson, axiosFormData } from "../api/axiosConfig";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext(() => {});

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const currentUser = useContext(CurrentUserContext);
  const [profileData, setProfileData] = useState({
    profiles: [],
    currentUserProfile: null,
  });

  useEffect(() => {
    // Fetching profiles lists for followers
    const fetchProfiles = async () => {
      try {
        const response = await axiosFormData.get("/api/profiles/");
        setProfileData((prevState) => ({
          ...prevState,
          profiles: response.data,
        }));
      } catch (error) {
        console.error("Error fetching other profiles:", error);
      }
    };

    // Fetching the current user's profile
    const fetchCurrentUserProfile = async () => {
      if (currentUser?.isLoggedIn) {
        try {
          const response = await axiosJson.get("/current-profile/");
          setProfileData((prevState) => ({
            ...prevState,
            currentUserProfile: response.data,
          }));
        } catch (error) {
          console.error("Error fetching current user's profile:", error);
        }
      }
    };

    fetchProfiles();
    fetchCurrentUserProfile();
  }, [currentUser]);

  useEffect(() => {
    console.log("Current UserProfile:", profileData.currentUserProfile);
  }, [profileData]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};