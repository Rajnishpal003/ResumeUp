import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

function AuthPage({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    onLogin(username); // simulate login
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>Log In</h2>
        <p>
          Need an account? <a href="#">Create an account</a>
        </p>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Log In
        </button>

        <div className="options">
          <label>
            <input type="checkbox" /><p>Keep me logged in </p> 
          </label>
          <div>
            <a href="#">Forgot username?</a> · <a href="#">Forgot password?</a>
          </div>
        </div>

        <footer>©2025 Resume App · Privacy · Terms</footer>
      </div>

      <div className="auth-right">
        <div className="mockup">
          <h3>Say goodbye to boring resumes.</h3>
          <p>Use our AI-enhanced editor to automatically improve your resume.</p>
          <button className="learn-more">Learn How</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
