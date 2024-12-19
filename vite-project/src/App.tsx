// App.js
import './app.css';
import { BrowserRouter as Router ,Switch, Route, Link} from 'react-router-dom';
import Homee from './pages/homee';
import Empresas from './pages/empresas';
import Contato from './pages/contato';


function App() {


  return (
    <Router>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/Empresa'}>Empresa</Link></li>
        <li><Link to={'/Contato'}>Contato</Link></li>
      </ul>

      <Switch>
        <Route path = '/'>
          <Homee/>
        
         
        </Route>
      </Switch>
      <Route path='/empresas'>
      <Empresas/>
      </Route>
      <Route path='/contato'>
      <Contato/>
      </Route>
    </Router>

  );
}

export default App;