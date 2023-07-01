const { Pool } = require("pg");
const pool = require("../db");

const createUserProfile = async (user_id, bio, location, birthday, profile_picture) => {
  const query = {
    text: `INSERT INTO user_profiles (user_id, bio, location, birthday, profile_picture)
           VALUES ($1, $2, $3, $4, $5)`,
    values: [user_id, bio, location, birthday, profile_picture],
  };

  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();

    return result.rows[0]; // Return the created user profile if needed
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUserProfile,
};