import React, { useState } from 'react';
import IconSocial from './IconSocial';
import FormLogin from './FormLogin';

interface LoginProps {
  onButtonClick: () => void;
  onLogin: (email: string, password: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onButtonClick, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="content conteudo-principal">
      <section className="conteudo-coluna-principal">
        <h2 className="conteudo-titulo titulo-primario">Welcome back!</h2>
        <p className="conteudo-subtitulo descricao-primaria">To keep with your personal info</p>
        <p className="conteudo-subtitulo descricao-primaria">Please login with personal info</p>
        <button className="btn button-primario" onClick={onButtonClick}>
          Sign in
        </button>
      </section>

      <section className="conteudo-coluna-secundario">
        <h2 className="conteudo-titulo titulo-secundario">Sign in to developer</h2>
        <IconSocial />
        <p className="conteudo-subtitulo descricao-secundaria">or use your email account</p>
        <form className="conteudo-principal-form" onSubmit={handleLogin}>
          <FormLogin setEmail={setEmail} setPassword={setPassword} />
          <a className="password">forgot your password?</a>
          <button className="btn button-secundario" type="submit">Sign in</button>
        </form>
      </section>
    </div>
  );
};

export default Login;
