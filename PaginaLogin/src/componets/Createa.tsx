import React from 'react';

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
    </div>
  );
};

export default Createa;
