import React, { useState } from 'react';

interface LoginProps {
  onButtonClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onButtonClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password }); // Lógica de validação pode ser adicionada aqui.
  };

  return (
    <div className="content conteudo-principal">
      <section className="conteudo-coluna-principal">
        <h2 className="conteudo-titulo titulo-primario">Welcome back!</h2>
        <form onSubmit={handleSubmit} className="conteudo-principal-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn button-primario">Sign in</button>
        </form>
        <button className="btn button-secundario" onClick={onButtonClick}>
          Create Account
        </button>
      </section>
    </div>
  );
};

export default Login;
