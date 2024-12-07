import { useState } from "react";

function Condicional() {
  const [email, setEmail] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  function enviarEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    setUserEmail(email)
    alert(`Email enviado: ${userEmail}`);
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
    </div>
  );
}

export default Condicional;
