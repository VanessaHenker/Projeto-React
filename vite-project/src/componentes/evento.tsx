

function Evento() {

  function meuEvento(){
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
