function Form() {

  function cadastrarUsurario(){
    alert('Cadastrou usuario')
  }
  return (
    <div>
      <h1>Meu cadastro: </h1>
      <form onSubmit={cadastrarUsurario}>
        <input type="text"  placeholder="Digite o seu nome:"/>
      </form>
      <div>
        <input type="submit" value={cadastrar}/>
      </div>
    </div>
  )
}

export default Form
