import React from "react"

function Evento() {

  function meuEvento(e: React.MouseEvent<HTMLButtonElement>){
    console.log("opa, fui ativado!")
  }

  return (
    <div>
      <p>clique para disparar um evento</p>
      <button onClick={meuEvento}>clique aqui</button>
    </div>
  )
}

export default Evento
