import api from "../api";

export const fetchUserProfile = async (profileId) => {
    try {
      const response = await api.get(`/profiles/${profileId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
};