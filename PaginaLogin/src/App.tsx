import React, { useState } from 'react';
import './style.css';
import Createa from "./componets/Createa";
import Login from "./componets/Login";

const App: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const handleButtonClick = () => {
    setIsSignIn(!isSignIn);
  };

  const handleCreateAccount = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");// Tenta recuperar a lista de usuários armazenada no `localStorage`. Se não houver nada, inicializa com um objeto vazio.

    if (users[email]) {// Verifica se o email já está cadastrado. Se sim, exibe um alerta e retorna `false`.
      alert("Email já cadastrado!");
      return false;
    }

    users[email] = password;
    localStorage.setItem("users", JSON.stringify(users)); // Armazena o email e senha do novo usuário no `localStorage`.

    alert("Conta criada com sucesso!");
    return true;
  };

  const handleLogin = (email: string, password: string) => {   // Função que gerencia a criação de uma conta. Cadastra um novo usuário no `localStorage` caso o email ainda não esteja registrado.
    const users = JSON.parse(localStorage.getItem("users") || "{}");// Recupera a lista de usuários armazenada no `localStorage`. Inicializa com um objeto vazio caso não exista.

    if (users[email] && users[email] === password) {
      alert("Login realizado com sucesso!");  // Verifica se o email e a senha correspondem a um usuário registrado. Se sim, exibe um alerta de sucesso e retorna `true`.
      return true;
    }

    alert("Email ou senha incorretos!");// Função que gerencia o login. Confirma se o email e a senha correspondem a um usuário cadastrado no `localStorage`.
    return false;
  };

  return (
    <main className={isSignIn ? 'sign-in-js' : 'sign-up-js'}> {/*   Renderiza a estrutura principal do componente, aplicando a classe CSS `sign-in-js` ou `sign-up-js` dependendo do estado `isSignIn`. */}
      <div className="conteudo">
        <Login onButtonClick={handleButtonClick} onLogin={handleLogin} />
        <Createa onButtonClick={handleButtonClick} onCreateAccount={handleCreateAccount} />
      </div>
    </main>
  );
};

export default App;

