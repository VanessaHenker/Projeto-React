import './App.css';
import NavBar from './componentes/navBar.tsx';

function App() {
  return (
    <>
      <div>
        <NavBar /> {/* Mantido em minúsculas para corresponder ao nome da exportação */}
        
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
