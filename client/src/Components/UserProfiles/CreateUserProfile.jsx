import React, { useState } from "react";
import api from "../../api";

const CreateUserProfile = ({ user }) => {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Construct the profile object with form data
    const profileData = {
      user_id: user.id,
      bio,
      location,
      birthday,
      profile_picture: "",
    };

    try {
      // Make a request to the backend API to upload the profile picture and get the URL
      const {
        data: { profile_picture_url },
      } = await api.post("/upload_profile_picture", { profilePicture });

      // Update the profile object with the profile picture URL
      profileData.profile_picture = profile_picture_url;

      // Make another request to create the user profile with the updated data
      await api.post("/create_user_profile", profileData);
      console.log("User profile created successfully");

      // Reset form fields after successful submission
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
      <form onSubmit={handleFormSubmit} className="form-content">
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
