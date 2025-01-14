import { Link } from 'react-router-dom'
import Container from './container'


import logo from "../../img/costs_logo.png"
import styles from "../layout/navBar.module.css";



function NavBar() {
  return (
    <nav className= {styles.navBar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="costs" />
        </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contato</Link></li>
          <li><Link to="/company">Empresa</Link></li>
          <li> <Link to="/newproject">Novo projeto</Link></li>
        </ul>
    
     
       
      </Container>

    </nav>
  )
}



export default NavBar;
