import './App.css';
import { NavBar } from './NavBar'; // Importa o NavBar

function App() {
  return (
    <div className="app-container">
      <NavBar /> {/* Inclui o NavBar aqui */}

      <section className="section">
        <div className="section-content">
          <h1>Section 1</h1>
        </div>

        <div className="section-content">
          <h2>Section 2</h2>
        </div>
      </section>

      <footer className="footer">
        <h1>Footer</h1>
      </footer>
    </div>
  );
}

export default App;
