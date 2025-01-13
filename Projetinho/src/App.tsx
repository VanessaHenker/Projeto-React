import './style.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Company from './components/company';
import Contact from './components/contact';
import Home from './components/home';
import NewProject from './components/newproject';
import Container from './components/layout/container';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <Container>
        <nav>
          <ul>
            <li>
              <Link to="/" aria-label="Ir para a página inicial">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" aria-label="Ir para a página de contato">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/company" aria-label="Ir para a página da empresa">
                Empresa
              </Link>
            </li>
            <li>
              <Link to="/newproject" aria-label="Criar um novo projeto">
                Novo Projeto
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
          {/* Rota para páginas não encontradas */}
          <Route path="*" element={<h2>Página não encontrada</h2>} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
