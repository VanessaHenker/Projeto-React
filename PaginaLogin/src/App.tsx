import './style.css';
import { useState } from 'react';
import Createa from "./componets/Createa";
import Login from "./componets/Login";

function App() {
  const [mode, setMode] = useState("sign-in-js");

  return (
    <>
      <main className={`conteudo ${mode}`}>
        <button id="signin" onClick={() => setMode("sign-in-js")}>Sign In</button>
        <button id="signup" onClick={() => setMode("sign-up-js")}>Sign Up</button>
        <Login />
        <Createa />
      </main>
    </>
  );
}

export default App;
