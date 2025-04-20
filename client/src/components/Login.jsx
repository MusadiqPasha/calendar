// src/components/Login.jsx
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }
    localStorage.setItem('username', username);
    onLogin(username);
  };

  return (
    <div className="login-container">
      <h2>Welcome to Team Calendar</h2>
      <p>Please enter your name to continue</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Your Name:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <button type="submit" className="login-button">Enter Calendar</button>
      </form>
    </div>
  );
}

export default Login;