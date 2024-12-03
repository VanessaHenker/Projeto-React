function From() {
  function cadastrarUsuario(e: React.FormEvent) {
    e.preventDefault(); 
    alert('Usuário cadastrado com sucesso!');
  }

  return (
    <div>
      <h1>Meu Cadastro:</h1>
      <form onSubmit={cadastrarUsuario}>
        <input type="text" placeholder="Digite o seu nome:" />
        <input type="submit" value="Cadastrar" />
      </form>
    </div>
  );
}

export default From;
