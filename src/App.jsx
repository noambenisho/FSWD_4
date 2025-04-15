// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Registration from './components/Registration';
import MainPage from './components/MainPage';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={localStorage.getItem('currentUser') ? '/main' : '/login'} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/main" element={localStorage.getItem('currentUser') ? <MainPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
