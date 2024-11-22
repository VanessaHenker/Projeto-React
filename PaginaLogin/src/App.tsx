import React, { useState } from 'react';
import './style.css';

import Createa from "./componets/Createa";
import Login from "./componets/Login";

const App: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(false);  

  const handleButtonClick = () => {
    setIsSignIn(!isSignIn); 
  };

  return (
    <div className={isSignIn ? 'sign-in-js' : 'sign-up-js'}> {/* A classe é alterada com base no estado */}
      <main className="conteudo">
        <Login onButtonClick={handleButtonClick} />
        <Createa onButtonClick={handleButtonClick} />
      </main>
    </div>
  );
};

export default App;
