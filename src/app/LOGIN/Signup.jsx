import React, { useState } from "react";
import "./signupDesign.css";
import { API_URL } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setSignupError("");

    if (!email || !password) {
      setSignupError("Please fill in both fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/user/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSignupError(data.message || "Signup failed");
      }

      navigate("/Login");
    } catch (error) {
      setSignupError("Server error, please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
        {signupError && <p className="error">{signupError}</p>}
      </form>
    </div>
  );
};

export default Signup;
