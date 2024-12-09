import './app.css';
import Condicional from './componentes/condicional';

function App() {

  const meusItens = ['React', 'Vue', 'Angular']


  return (
    <div className='teste'>
      <h1>Renderização de lista</h1>
      <Condicional/>
    </div>
  );
}

export default App; 