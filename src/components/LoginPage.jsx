import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from '../CSS/user.module.css';

const LoginPage = ({ switchTo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      switchTo('main');
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
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className={classes.inputBox}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={classes.inputBox}>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={classes.btn}>Login</button>
        <div className={classes.link}>
          <p>Don't have an account? <a href="#" onClick={() => switchTo('register')}>Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;


LoginPage.propTypes = {
  switchTo: PropTypes.func.isRequired,
};