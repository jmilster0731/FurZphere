const { Pool } = require("pg");
const pool = require("../db");
const bcrypt = require("bcrypt");

async function createUser(username, password, email) {
  // Generate a salt for password hashing
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password
  const passwordHash = await bcrypt.hash(password, salt);

  // Insert the user into the database
  const query =
    "INSERT INTO users (username, password_hash, salt, email) VALUES ($1, $2, $3, $4)";
  const values = [username, passwordHash, salt, email];
  return pool.query(query, values);
}

async function getUserByEmail(email) {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getUserById(userId) {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [userId];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateUser(id, updatedFields) {
  let query = "UPDATE users SET ";
  const values = [];
  let valueIndex = 1;

  if (updatedFields.hasOwnProperty("profile_id")) {
    query += "profile_id = $" + valueIndex;
    values.push(updatedFields.profile_id);
    valueIndex++;
  } else {
    const fields = Object.keys(updatedFields);

    fields.forEach((field, index) => {
      query += `${field} = $${valueIndex}`;
      values.push(updatedFields[field]);
      valueIndex++;

      if (index !== fields.length - 1) {
        query += ", ";
      }
    });
  }

  query += " WHERE id = $" + valueIndex;
  values.push(id);

  return pool.query(query, values);
}



module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
};
