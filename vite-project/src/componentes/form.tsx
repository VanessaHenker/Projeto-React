import { useState } from "react";

function From() {
  function cadastrarUsuario(e: React.FormEvent) {
    e.preventDefault();
    alert('Usuário cadastrado com sucesso!');
    alert(`Name: ${name}, Senha: ${password}`);
  }

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h1 className="teste">Meu Cadastro:</h1>
      <form onSubmit={cadastrarUsuario} className="teste">
        <div>
          <label htmlFor="name">Nome: </label>
          <input type="text" placeholder="Digite o seu nome:" id="name"
            onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="password">Senha: </label>
          <input type="password" placeholder="Digite sua senha" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input type="submit" value="Cadastrar" />
      </form>
    </div>
  );
}

export default From;
