function Form() {
  return (
    <div>
      <h1>Meu cadastro: </h1>
      <form action="">
        <input type="text"  placeholder="Digite o seu nome:"/>
      </form>
      <div>
        <input type="submit" value={cadastrar}/>
      </div>
    </div>
  )
}

export default Form
