import React, { useState } from 'react';
import Opening from './src/Component/Opening_page/Opening';
import Login from './src/Component/Login/Login';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Opening');

  return (
    <>
      {currentScreen === 'Opening' && (
        <Opening onNavigateToLogin={() => setCurrentScreen('Login')} />
      )}
      {currentScreen === 'Login' && (
        <Login onBack={() => setCurrentScreen('Opening')} />
      )}
    </>
  );
};

export default App;
