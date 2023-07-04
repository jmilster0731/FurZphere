import React, { useState } from "react";
import CreateUserProfile from "../../Components/UserProfiles/CreateUserProfile";
import ImageOverlay from "../../Components/ImageOverlay/ImageOverlay";

const MyProfile = ({ user, profileData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayImageUrl, setOverlayImageUrl] = useState('');

  const handleProfilePictureClick = () => {
    setOverlayImageUrl(profileData.profile_picture_url);
    setShowOverlay(true);
  };

  if (!user || !user.profile_id) {
    // Render the CreateProfile component if profile_id doesn't exist
    return <CreateUserProfile user={user} />;
  }

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
              onClick={handleProfilePictureClick}
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

      {showOverlay && (
        <ImageOverlay imageUrl={overlayImageUrl} onClose={() => setShowOverlay(false)} />
      )}
    </div>
  );
};

export default MyProfile;