import { Link } from 'react-router-dom';
import Container from './container';


import logo from "../../img/costs_logo.png"
import styles from "./navBar.module.css"


function NavBar() {
  return (
    <nav>
      <Container>
        <Link to= "/">
            <img src = {logo} alt = "costs" />
        </Link>
     <Link to="/">Home</Link>
      <Link to="/contact">Contato</Link>
      <Link to="/company">Empresa</Link>
      <Link to="/newproject">Novo projeto</Link>
      </Container>

    </nav>
  )
}
  


export default NavBar;
