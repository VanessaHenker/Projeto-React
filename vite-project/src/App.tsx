import './app.css';
import Evento from "./componentes/evento";
import From from './componentes/form';

function App() {
  return (
    <div>
      <Evento numero={0} />
      <Evento numero={1} />
      <Evento numero={2} />
      <From/>
    </div>
  );
}

export default App; 