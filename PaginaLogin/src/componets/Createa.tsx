import React, { useState } from 'react';

interface CreateaProps {
  onButtonClick: () => void;
}

const Createa: React.FC<CreateaProps> = ({ onButtonClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create Account:', { email, password }); // Lógica para criar conta.
  };

  return (
    <div className="content conteudo-principal">
      <section className="conteudo-coluna-principal">
        <h2 className="conteudo-titulo titulo-primario">Create Account</h2>
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
          <button type="submit" className="btn button-primario">Sign up</button>
        </form>
        <button className="btn button-secundario" onClick={onButtonClick}>
          Sign in
        </button>
      </section>
    </div>
  );
};

export default Createa;
