import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../CSS/user.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || {};
    const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts')) || {};
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
    localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || {};
    const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || {};
    const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts')) || {};

    if (blockedUsers[username]) {
      alert('You are permanently blocked.');
      return;
    }

    if (users[username] && users[username].password === password) {
      localStorage.setItem('currentUser', username);
      loginAttempts[username] = 0;
      localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
      navigate('/main');
    } else {
      loginAttempts[username] = (loginAttempts[username] || 0) + 1;
      localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));

      if (loginAttempts[username] < 3) {
        alert('Invalid username or password.');
      } else if (loginAttempts[username] < 6) {
        alert('Too many attempts. You will soon be blocked.');
      } else {
        alert('You are permanently blocked.');
        blockedUsers[username] = true;
        localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <form id="loginForm" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className={classes.inputBox}>
          <input
            id="username"
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={classes.inputBox}>
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={classes.btn} onClick={handleLogin}>Login</button>
        <div className={classes.link}>
          <p>Don't have an account? <a href="#" onClick={() => navigate('/register')}>Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
