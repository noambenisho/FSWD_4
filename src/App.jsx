import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Registration from './components/Registration';
import MainPage from './components/MainPage';

const App = () => {
  const [view, setView] = useState(localStorage.getItem('currentUser') ? 'main' : 'login');

  const switchTo = (newView) => setView(newView);

  return (
    <>
      {view === 'login' && <LoginPage switchTo={switchTo} />}
      {view === 'register' && <Registration switchTo={switchTo} />}
      {view === 'main' && <MainPage switchTo={switchTo} />}
    </>
  );
};

export default App;
