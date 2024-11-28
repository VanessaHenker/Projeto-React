import React from 'react';

function Evento() {
  function meuEvento(_e: React.MouseEvent<HTMLButtonElement>) {
    prompt("opa, fui ativado!");
    // O parâmetro _e pode ser usado futuramente, se necessário
  }

  return (
    <div>
      <p>clique para disparar um evento</p>
      <button onClick={meuEvento}>clique aqui</button>
    </div>
  );
}

export default Evento;
