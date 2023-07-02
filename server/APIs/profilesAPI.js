const { Pool } = require("pg");
const pool = require("../db");

const createUserProfile = async (
  user_id,
  bio,
  location,
  birthday,
  profile_picture_url
) => {
  const query = {
    text: `INSERT INTO user_profiles (user_id, bio, location, birthday, profile_picture_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id`, // Return the inserted profile ID
    values: [user_id, bio, location, birthday, profile_picture_url],
  };

  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();

    return result.rows[0].id; // Return the inserted profile ID
  } catch (error) {
    throw error;
  }
};

const updateUserProfile = async (profileId, updatedFields) => {
  console.log("Profile ID:", profileId);
  console.log("Updated Fields:", updatedFields);

  const fieldKeys = Object.keys(updatedFields);
  const fieldValues = Object.values(updatedFields);
  const valuePlaceholders = fieldKeys.map((_, index) => `$${index + 2}`);
  const query = {
    text: `UPDATE user_profiles
           SET ${fieldKeys
             .map((key, index) => `${key} = ${valuePlaceholders[index]}`)
             .join(", ")}
           WHERE id = $1`,
    values: [profileId, ...fieldValues],
  };

  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();

    return result.rows[0]; // Return the updated user profile if needed
  } catch (error) {
    throw error;
  }
};

const getUserProfile = async (profileId) => {
  const query = {
    text: `SELECT * FROM user_profiles WHERE id = $1`,
    values: [profileId],
  };

  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();

    return result.rows[0]; // Return the user profile
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUserProfile,
  updateUserProfile,
  getUserProfile,
};
