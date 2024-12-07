function Condicional() {
  function enviarEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    alert("Tudo ok");
  }

  return (
    <div>
      <h2>Cadastre seu email:</h2>
      <form onSubmit={enviarEmail}>
        <input type="email" placeholder="Digite seu email" />
        <button type="submit">Enviar email</button>
      </form>
    </div>
  );
}

export default Condicional;
