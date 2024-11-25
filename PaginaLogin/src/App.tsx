import React, { useState } from 'react';
import './style.css';

import Createa from "./componets/Createa";
import Login from "./componets/Login";

const App: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  const handleButtonClick = () => {
    setIsSignIn(!isSignIn);
  };

  const handleCreateAccount = (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email]) {
      alert("Email já cadastrado!");
      return false;
    }
    users[email] = { password, name };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Conta criada com sucesso!");
    return true;
  };

  const handleLogin = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email] && users[email].password === password) {
      alert(`Bem-vindo, ${users[email].name}!`);
      return true;
    }
    alert("Email ou senha incorretos!");
    return false;
  };

  return (
    <main className={isSignIn ? 'sign-in-js' : 'sign-up-js'}>
      <div className="conteudo">
        <Login onButtonClick={handleButtonClick} onLogin={handleLogin} />
        <Createa onButtonClick={handleButtonClick} onCreateAccount={handleCreateAccount} />
      </div>
    </main>
  );
};

export default App;
