import { useState } from "react";

function Condicional() {
  const [email, setEmail] = useState<string>(""); 
  const [userEmail, setUserEmail] = useState<string>(""); 

  function enviarEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    setUserEmail(email); 
  }


  function limparEmail(){
   setUserEmail('')
  }

  return (
    <div>
      <h2>Cadastre seu email:</h2>
      <form onSubmit={enviarEmail}>
        <input 
          type="email" 
          placeholder="Digite seu email" 
          value={email} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
        />
        <button type="submit">Enviar email</button>
      </form>
      {userEmail && <p>O email cadastrado é: {userEmail}</p>}
      <button onClick={limparEmail}>Limpar email</button>
    </div>
  );
}

export default Condicional;
