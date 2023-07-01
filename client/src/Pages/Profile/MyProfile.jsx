import React from 'react'
import CreateUserProfile from '../../Components/UserProfiles/CreateUserProfile';

const MyProfile = ({ user }) => {
    if (!user || !user.profile_id) {
      // Render the CreateProfile component if profile_id doesn't exist
      return (
        <CreateUserProfile />
      );
    }
  
    // Render the profile content
    return (
      <div>
        {/* JSX code for rendering the profile content */}
      </div>
    );
  };
export default MyProfile