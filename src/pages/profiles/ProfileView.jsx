import React, { useContext, useState } from "react";
import { ProfileDataContext, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosFormData } from "../../api/axiosConfig";

const ProfileView = () => {
  const { currentUserProfile } = useContext(ProfileDataContext);
  const setProfileData = useSetProfileData();

  // State for handling file input
  const [imageFile, setImageFile] = useState(null);

  // file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  // form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await axiosFormData.patch("profiles/profile-detail/", formData);
        
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          currentUserProfile: {
            ...prevProfileData.currentUserProfile,
            profile_image: response.data.profile_image
          }
        }));
        // Reset file input
        setImageFile(null);
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    }
  };

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
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="imageInput" className="form-label">Update Profile Image:</label>
          <input
            type="file"
            className="form-control"
            id="imageInput"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Image</button>
      </form>
    </div>
  );
};

export default ProfileView;
