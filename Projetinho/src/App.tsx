import './style.css';
import { BrowserRouter as Router, Routes, Route, Switch, Link } from 'react-router-dom'

import Home from './componets/home';
import Company from './componets/company';
import Contact from './componets/contact';
import Newproject from './componets/newproject';


function App() {
  return (
    <Router>
        <div>
          <Link to = "/">Home</Link>
          <Link to = "/contact">Contato</Link>
          <Link to = "/company">Empresa</Link>
          <Link to = "/newproject">Novo projeto</Link>
        </div>
    
      
      <Switch>
        <div>
          
        </div>
      </Switch>
      
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
