import React, { useState } from 'react';
import IconSocial from './IconSocial';
import FormLogin from './FormLogin';

interface LoginProps {
  onButtonClick: () => void;
  onLogin: (email: string, password: string) => boolean;
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
          <FormLogin
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            emailValid={emailValid}
            passwordValid={passwordValid}
          />
          <a className="password">forgot your password?</a>
          <button className="btn button-secundario" type="submit">
            Sign in
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
