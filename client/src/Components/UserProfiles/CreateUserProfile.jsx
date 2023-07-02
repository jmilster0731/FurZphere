import React, { useState } from "react";
import api from "../../api";

const CreateUserProfile = ({ user }) => {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("profilePicture", profilePicture); // Append the file to the form data
  
      const { data } = await api.post("/create_user_profile", {
        user_id: user.id,
        bio,
        location,
        birthday,
        profile_picture_url: "", // Keep this line as it is
      });
  
      console.log({ data });
  
      let profileId; // Define the profileId variable
  
      if (data && data.id) {
        profileId = data.id;
        console.log("Profile ID:", profileId);
      } else {
        // Handle the case where the profile ID is not available
        console.error("Error creating user profile: Profile ID not found");
        return;
      }
  
      const {
        data: { profile_picture_url },
      } = await api.post("/upload_profile_picture", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Set the content type header
      });
  
      const updatedProfileData = {
        user_id: user.id,
        bio,
        location,
        birthday,
        profile_picture_url: profile_picture_url,
      };
  
      await api.put(`/update_user/${user.id}`, { profile_id: profileId }); // Update the user with the profile fields
      await api.put(`/update_user_profile/${profileId}`, updatedProfileData); // Update the user profile with the profile fields
  
      console.log("User profile created successfully");
  
      setBio("");
      setLocation("");
      setBirthday("");
      setProfilePicture(null);
    } catch (error) {
      console.error("Error creating user profile:", error);
      // Handle the error and display an appropriate message to the user
    }
  };

  return (
    <div className="form-container" style={{ margin: "10px auto" }}>
      <div className="form-header">
        <h3>You Need to Create a Profile Before you can View It!</h3>
      </div>
      <form onSubmit={handleFormSubmit} className="form-content" encType="multipart/form-data">
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="no-resize"
          style={{ height: "100px" }}
          required
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <label htmlFor="birthday">Birthday:</label>
        <input
          type="Date"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
          required
        />
        <button type="submit">Create My Profile</button>
      </form>
    </div>
  );
};

export default CreateUserProfile;
