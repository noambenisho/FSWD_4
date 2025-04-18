import React, { useState } from 'react';
import classes from '../CSS/user.module.css';

const Registration = ({ switchTo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
      alert('Username already exists!');
      return;
    }

    users[username] = { password };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! You can now log in.');
    switchTo('login');
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className={classes.inputBox}>
          <input
            type="text"
            placeholder="Choose a username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={classes.inputBox}>
          <input
            type="password"
            placeholder="Choose a password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={classes.btn}>Register</button>
        <div className={classes.link}>
          <p>Already have an account? <a href="#" onClick={() => switchTo('login')}>Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
