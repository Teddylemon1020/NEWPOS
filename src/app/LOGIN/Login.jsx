// src/Login.jsx
import React, { useState } from "react";
import "./signupDesign.css"; // Ensure this file is in the src directory or adjust the path
import Signup from "./signup.jpg"; // Importing the image
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook

const Login = () => {
  const [username, setUsername] = useState(""); // Storing username input
  const [password, setPassword] = useState(""); // Storing password input
  const [loginError, setLoginError] = useState(""); // Storing login error message
  const adminAccount = { username: "admin", password: "password" };

  const navigate = useNavigate(); // Declare navigate using the useNavigate hook

  // Array to store registered user accounts (replace with backend storage in production)
  const userAccounts = [];

  const handleLogin = (username, password) => {
    // Check if the user is the predefined admin
    if (
      username === adminAccount.username &&
      password === adminAccount.password
    ) {
      navigate("/Home"); // Redirect admin to the admin page
    } else {
      // Check if the user exists in registered users
      const registeredUser = userAccounts.find(
        (user) => user.username === username && user.password === password
      );

      if (registeredUser) {
        navigate("/Orders"); // Redirect users to Orders page
      } else {
        setLoginError("Invalid username or password"); // Show error for invalid credentials
      }
    }
  };
  const handleSignup = (username, password) => {
    // Check if username is already taken
    const userExists = userAccounts.find((user) => user.username === username);
    if (userExists) {
      setSignupError("Username is already taken");
      return;
    }

    // Add new user to the list and navigate to Orders
    userAccounts.push({ username, password, role: "user" });
    navigate("/Orders"); // Redirect new users directly to Orders page
  };
  const handleSignupClick = () => {
    navigate("/signup"); // Navigate to the Signup page
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleLogin(username, password);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Signup})`, // Use backticks for template literals
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="login-container" id="login-container">
        <h1>Login</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Handle username input change
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Handle password input change
            required
          />
          <button type="submit">Login</button>
          {loginError && <p id="login-error">{loginError}</p>}{" "}
          {/* Display login error if invalid */}
        </form>
        {/* Sign Up Button */}
        <button onClick={handleSignupClick} className="signup-button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

// Make sure you have a default export
export default Login;
