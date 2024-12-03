import React from 'react';

function Evento(numero) {

  function meuEvento(_e: React.MouseEvent<HTMLButtonElement>){
    prompt("opa, fui ativado!")
    prompt("opa,, fui ativado," ${fui ativado})
  }

  return (
    <div className='teste'>
      <p>clique para disparar um evento</p>
      <button onClick={meuEvento}>clique aqui</button>
    </div>
  )
}

export default Evento