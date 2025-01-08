import './style.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Company from './componets/company';
import Contact from './componets/contact';
import Home from './componets/home';
import Newproject from './componets/newproject';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/contact">Contato</Link>
          <Link to="/company">Empresa</Link>
          <Link to="/newproject">Novo projeto</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/company" element={<Contact/>} />
        <Route path="/contact" element={<Company/>} />
        <Route path="/newproject" element={<Newproject/>} />
      </Routes>
    </Router>
  );
}

export default App;
