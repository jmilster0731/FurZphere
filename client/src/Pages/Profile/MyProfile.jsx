import React, { useEffect, useState } from "react";
import CreateUserProfile from "../../Components/UserProfiles/CreateUserProfile";
import api from "../../api";

const MyProfile = ({ user }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user && user.profile_id) {
      fetchUserProfile(user.profile_id);
    }
  }, [user]);

  const fetchUserProfile = async (profileId) => {
    try {
      const { data } = await api.get(`/profiles/${profileId}`);
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  if (!user || !user.profile_id) {
    // Render the CreateProfile component if profile_id doesn't exist
    return <CreateUserProfile user={user} />;
  }

  // Render the profile content once the profile data is fetched
  return (
    <div>
      {profileData ? (
        <div className="page-container">
          <div className="my-profile-container">
            <div
              className="my-profile-picture"
              style={{
                backgroundImage: `url(${profileData.profile_picture_url})`,
                backgroundSize: "cover",
              }}
            />
            <div className="my-profile-details">
              <div className="my-profile-details-header">{user.username}</div>
              <div className="my-profile-details-content">
                <div>Bio: </div>
                <div>{profileData.bio}</div>
                <div>Location: </div>
                <div>{profileData.location}</div>
                <div>Birthday: </div>
                <div>{formatDate(profileData.birthday)}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default MyProfile;
