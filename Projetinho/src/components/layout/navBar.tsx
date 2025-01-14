import { Link } from 'react-router-dom';
import Container from './container';




function NavBar() {
  return (
    <nav>
      <Container>
      <li><Link to="/">Home</Link></li>
       <li><Link to="/contact">Contato</Link></li>
       <li><Link to="/company">Empresa</Link></li>
       <li><Link to="/newproject">Novo projeto</Link></li>
      </Container>

    </nav>
  )
}
  


export default NavBar;
