import React, { useContext } from "react";
import { ProfileDataContext } from "../../contexts/ProfileDataContext";

const ProfileView = () => {
  const { currentUserProfile } = useContext(ProfileDataContext);

  // Date formatting
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Profile Information</h2>
      <div className="profile-section">
      {currentUserProfile.profile_image && (
          <div>
            <strong>Profile Image:</strong>
            <img
              src={currentUserProfile.profile_image}
              alt="Profile"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        )}
        <p>
          <strong>Username:</strong> {currentUserProfile.username}
        </p>        
        <p>
          <strong>Profile ID:</strong> {currentUserProfile.profile_id}
        </p>
        <p>
          <strong>Last Login:</strong>{" "}
          {formatDate(currentUserProfile.last_login)}
        </p>
        
      </div>
      {/* button the edit the form  */}
    </div>
  );
};

export default ProfileView;
