// src/App.js
import React, { useState, useEffect } from 'react';
import CalendarApp from './components/Calendar';
import Login from './components/Login';
import './styles.css';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <div className="header">
            <h2>Team Calendar App</h2>
            <div className="user-panel">
              <span>Welcome, {username}</span>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </div>
          <CalendarApp />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;