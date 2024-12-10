// App.js
import './app.css';
import { useState } from 'react';
import SeuNome from './componentes/seuNome';
import Saudacao from './componentes/saudacao';

function App() {
  const [nome, setNome] = useState('');

  return (
    <div className="teste">
      <h1>State lift</h1>
      <SeuNome setNome={setNome} />
      {nome && <p>Bem-vindo, {nome}!</p>}
      <Saudacao nome = {nome}/>
    </div>
  );
}

export default App;