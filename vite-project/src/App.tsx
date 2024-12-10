// App.js
import './app.css';
import { useState } from 'react';
import SeuNome from './componentes/seuNome';

function App() {
  const [nome, setNome] = useState('');

  return (
    <div className="teste">
      <h1>State lift</h1>
      <SeuNome setNome={setNome} />
      {nome && <p>Bem-vindo, {nome}!</p>}
    </div>
  );
}

export default App;