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
          <input type="text" placeholder="Digite o seu nome:" />
        </div>
        <div>
          <input type="password" placeholder="Digite sua senha" />
        </div>
        <input type="submit" value="Cadastrar" />
      </form>
    </div>
  );
}

export default From;
