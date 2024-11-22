import React, { useEffect } from "react";
import "./style.css";
import Createa from "./componets/Createa";
import Login from "./componets/Login";

function App() {
  useEffect(() => {
    // Importar o script após o carregamento do componente
    import("./script.ts");
  }, []);

  return (
    <main className="conteudo">
     <Login/>
     <Createa/>
    </main>
  );
}

export default App;
