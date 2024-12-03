import './app.css';
import Evento from "./componentes/evento";

function App() {
  return (
    <div>
      <Evento numero={0} />
      <Evento numero={1} />
      <Evento numero={2} />
    </div>
  );
}

export default App;