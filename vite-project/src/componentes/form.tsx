function From() {
  function cadastrarUsuario(e: React.FormEvent) {
    e.preventDefault();
    alert('Usuário cadastrado com sucesso!');
  }

  return (
    <div>
      <h1 className="teste">Meu Cadastro:</h1>
      <form onSubmit={cadastrarUsuario} className="teste">
        <div>
          <label htmlFor="name">Nome: </label>
          <input type="text"  placeholder="Digite o seu nome:" id="name" />
        </div>
        <div>
          <label htmlFor="password">Senha: </label>
          <input type="password" placeholder="Digite sua senha" />
        </div>
        <input type="submit" value="Cadastrar" />
      </form>
    </div>
  );
}

export default From;
