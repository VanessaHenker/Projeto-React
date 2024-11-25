import React, { useState } from 'react';
import IconSocial from './IconSocial';
import FormLogin from './FormLogin';

interface LoginProps {
  onButtonClick: () => void; // Recebe a função para alternar entre login e cadastro
  onLogin: (email: string, password: string) => boolean; // Validação do login
}

const Login: React.FC<LoginProps> = ({ onButtonClick, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = onLogin(email, password);

    setEmailValid(isValid);
    setPasswordValid(isValid);
  };

  return (
    <div className="content conteudo-principal-secundario">
      <section className="conteudo-coluna-principal">
        <h2 className="conteudo-titulo titulo-secundario">Sign in to developer</h2>
        <IconSocial />
        <p className="conteudo-subtitulo descricao-secundaria">or use your email account</p>
        <form className="conteudo-principal-form" onSubmit={handleLogin}>
          <label className={`label-input ${emailValid ? 'input-valid' : 'input-invalid'}`}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={`label-input ${passwordValid ? 'input-valid' : 'input-invalid'}`}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <a className="password">forgot your password?</a>
          <button className="btn button-secundario" type="submit">
            Sign in
          </button>
        </form>
        {/* Aqui está o botão para alternar para a tela de cadastro */}
        <button className="btn button-primario" onClick={onButtonClick}>
          Create an account
        </button>
      </section>
    </div>
  );
};

export default Login;
