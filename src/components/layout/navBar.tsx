import React from 'react';
import { Link } from 'react-router-dom';
import Container from './container';

import logo from '../../img/costs_logo.png';
import styles from '../layout/navBar.module.css';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navBar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs Logo" className= {styles.logo}/>
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}><Link to="/">Home</Link></li>
          <li className={styles.item}><Link to="/projects">Projetos</Link></li>
          <li className={styles.item}><Link to="/contact">Contato</Link></li>
          <li className={styles.item}><Link to="/company">Empresa</Link>
          </li><li className={styles.item}><Link to="/newproject">Novo Projeto</Link></li>
        </ul>
      </Container>
    </nav>
  );
};

export default NavBar;
