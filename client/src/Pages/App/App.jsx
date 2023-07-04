import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Auth from '../Auth/Auth';
import { useFetchUserInformation } from '../../HelperFunctions/AuthHelper';
import { fetchUserProfile } from '../../HelperFunctions/UserProfileHelper';

import UtilBar from '../../Components/UtilBar/UtilBar';
import NavBar from '../../Components/NavBar/NavBar'

import '../../CSS/global.css'

import MyProfile from '../Profile/MyProfile';

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const user = useFetchUserInformation(authToken);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setAuthToken(authToken);
  }, []);

  useEffect(() => {
    if (user && user.profile_id) {
      const fetchProfile = async () => {
        const profileData = await fetchUserProfile(user.profile_id);
        setProfileData(profileData);
      };
      fetchProfile();
    }
  }, [user]);

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="app-page-container">
      <NavBar />
    <div>
      <Routes>
        <Route path="/profile" element={<MyProfile user={user} profileData={profileData}/>} />
      </Routes>
    </div>
      <UtilBar />
    </div>
  );
};

export default App;
