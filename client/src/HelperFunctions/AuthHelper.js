import { useEffect, useState } from "react";
import api from "../api";

export const fetchUserInformation = async (authToken) => {
  try {
    const response = await api.get("/get_user", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null;
  }
};

export const useFetchUserInformation = (authToken) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (authToken) {
        const userData = await fetchUserInformation(authToken);
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [authToken]);

  return user;
};

export const signOut = () => {
  localStorage.removeItem("authToken");
  // Force reload to show auth
  window.location.reload(); 
};
