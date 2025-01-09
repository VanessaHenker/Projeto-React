import './style.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Company from './components/company';
import Contact from './components/contact';
import Home from './components/home';
import Newproject from './components/newproject';
import Container from './components/layout/container';

function App() {
  return (
    <Router>
      <Container>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/contact">Contato</Link>
          <Link to="/company">Empresa</Link>
          <Link to="/newproject">Novo projeto</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<Newproject />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
