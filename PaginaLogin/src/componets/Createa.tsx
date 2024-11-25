import React, { useState } from 'react';
import IconSocial from './IconSocial';
import FormLogin from './FormLogin';
import FormName from './FromName';

interface CreateaProps {
  onButtonClick: () => void;
  onCreateAccount: (email: string, password: string, name: string) => boolean;
}

const Createa: React.FC<CreateaProps> = ({ onButtonClick, onCreateAccount }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAccount(email, password, name);
  };

  return (
    <div className="content conteudo-principal-secundario">
      <section className="conteudo-coluna-principal">
        <h2 className="conteudo-titulo titulo-primario">Hello, Friend</h2>
        <p className="conteudo-subtitulo descricao-primaria">Enter your personal details</p>
        <p className="conteudo-subtitulo descricao-primaria">and start journey with us</p>
        <button className="btn button-primario" onClick={onButtonClick}>
          Sign up
        </button>
      </section>

      <section className="conteudo-coluna-secundario">
        <h2 className="conteudo-titulo titulo-secundario">Create an account</h2>
        <IconSocial />
        <p className="conteudo-subtitulo descricao-secundaria">or use your email for registration</p>
        <form className="conteudo-principal-form" onSubmit={handleCreateAccount}>
          <FormName setName={setName} />
          <FormLogin setEmail={setEmail} setPassword={setPassword} />
          <button className="btn button-secundario" type="submit">Sign up</button>
        </form>
      </section>
    </div>
  );
};

export default Createa;
