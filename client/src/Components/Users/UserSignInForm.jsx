import React, { useState } from "react";
import api from "../../api";

const UserSignInForm = ({ handleSetSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      console.log("User signed in successfully");
      window.location.reload(); // Force page reload
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">Login!</div>
      <form onSubmit={handleSignIn} className="form-content">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <button type="button" onClick={handleSetSignIn}>
          Create an Account
        </button>
      </form>
    </div>
  );
};

export default UserSignInForm;
