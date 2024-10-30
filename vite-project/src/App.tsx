import './App.css';
import NavBar from 'componentes/navBar.tsx';


function App() {
  return (
    <div>
      <NavBar />

      <main>
        <section>
          <h1>Bem-vindo(a)!</h1>
          <p>Este é um exemplo de seção inicial.</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Cake Bliss. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
