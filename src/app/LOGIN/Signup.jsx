import React, { useState } from "react";
import "./signupDesign.css";

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (username && password) {
      onSignup(username, password); // Call the function to handle signup logic
    } else {
      setSignupError("Please fill in both fields");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
