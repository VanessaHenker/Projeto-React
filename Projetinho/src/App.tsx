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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contato</Link></li>
            <li><Link to="/company">Empresa</Link></li>
            <li><Link to="/newproject">Novo projeto</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
        </Routes>
      </Container>

      <Footer/>
    </Router>
  );
}

export default App;
