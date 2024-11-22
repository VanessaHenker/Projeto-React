import React, { useState } from "react";
import "./style.css";
import Createa from "./componets/Createa";
import Login from "./componets/Login";

const App: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Controla o estado entre Sign In e Sign Up

  const handleToggle = () => {
    setIsSignIn(!isSignIn); // Alterna o estado
  };

  return (
    <main className={`conteudo ${isSignIn ? "sign-in-js" : "sign-up-js"}`}>
      {isSignIn ? <Login onToggle={handleToggle} /> : <Createa onToggle={handleToggle} />}
    </main>
  );
};

export default App;
