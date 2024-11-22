import React from 'react';
import IconSocial from './IconSocial';
import FormLogin from './FormLogin';

interface CreateaProps {
  onButtonClick: () => void;
}

const Createa: React.FC<CreateaProps> = ({ onButtonClick }) => {
  return (
    <div className="content conteudo-principal-secundario">
      <section className="conteudo-coluna-principal">
        <h2 className="conteudo-titulo titulo-primario">Hello, Friend</h2>
        <p className="conteudo-subtitulo descricao-primaria">Enter your personal details</p>
        <p className="conteudo-subtitulo descricao-primaria">and start journey with us</p>
        <button id="signup" className="btn button-primario" onClick={onButtonClick}>
          Sign up
        </button>
      </section>

      <section className="conteudo-coluna-secundario">
        <h2 className="conteudo-titulo titulo-secundario">Sign in to developer</h2>
        <IconSocial />
        <p className="conteudo-subtitulo descricao-secundaria">or use your email account</p>
        <form className="conteudo-principal-from">
          <FormLogin/>

          <a className="password">forgot your password?</a>

        <button className="btn button-secundario">sign in</button>
        </form>
      </section>
    </div>
  );
};

export default Createa;
