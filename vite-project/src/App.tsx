// src/App.tsx
import './App.css';
import { NavBar } from './componentes/navBar'; // Corrija o caminho se necessário

function App() {
  return (
    <>
      <div>
        <NavBar /> {/* Aqui você usa o componente NavBar */}

        <section>
          <div>
            <h1>section 1</h1>
          </div>

          <div>
            <h2>section 2</h2>
          </div>
        </section>

        <footer>
          <h1>footer</h1>
        </footer>
      </div>
    </>
  );
}

export default App;
