// src/Login.jsx
import React, { useState } from "react";
import "./signupDesign.css"; // Ensure this file is in the src directory or adjust the path
import Signup from "./signup.jpg"; // Importing the image
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook
import { API_URL } from "../App.jsx";

const Login = () => {
  const [email, setEmail] = useState(""); // Storing username input
  const [password, setPassword] = useState(""); // Storing password input
  const [loginError, setLoginError] = useState(""); // Storing login error message

  const navigate = useNavigate(); // Declare navigate using the useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/user/log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setLoginError(data.message);
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      navigate("/home");
      return;
    } catch (error) {
      setLoginError(error);
      console.log(error);
      return;
    }
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
        <form id="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button onClick={() => navigate("/Signup")} className="signup-button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

// Make sure you have a default export
export default Login;
