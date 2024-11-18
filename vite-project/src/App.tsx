import { NavBar } from './src/componentes';

function App() {
  return (
    <>
      <NavBar /> {/* Uso correto do componente */}
      
      <section>
        <div>
          <h1>Section 1</h1>
        </div>

        <div>
          <h2>Section 2</h2>
        </div>
      </section>

      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  );
}

export default App;
