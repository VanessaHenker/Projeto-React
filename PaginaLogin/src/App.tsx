import React, { useState } from 'react';
import './style.css';

import Createa from "./componets/Createa";
import Login from "./componets/Login";

const App: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(false);  

  const handleButtonClick = () => {
    setIsSignIn(!isSignIn); 
  };
  //COD
  return (
    <main className={isSignIn ? 'sign-in-js' : 'sign-up-js'}>
      <div className="conteudo">
        <Login onButtonClick={handleButtonClick} />
        <Createa onButtonClick={handleButtonClick} />
      </div>
    </main>
  );
};

export default App;