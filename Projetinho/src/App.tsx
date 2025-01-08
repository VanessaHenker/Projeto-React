import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css';
import Home from './componets/home';
import Company from './componets/company';
import Contact from './componets/contact';
import Newproject from './componets/newproject';


function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/contact">Contato</a></li>
          <li><a href="/company">Empresa</a></li>
          <li><a href="/newproject">Novo Projeto</a></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/company" element={<Company/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/newproject" element={<Newproject/>} />
      </Routes>
    </Router>
  );
}

export default App;
