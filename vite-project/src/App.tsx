// App.js
import './app.css';
import OutraLista from './componentes/outraLista';

function App() {
  const meusItens = ['React', 'Vue', 'Angular'];

  return (
    <div className="teste">
      <h1>Renderização de lista</h1>
      <OutraLista itens={meusItens} />
    </div>
  );
}

export default App;
