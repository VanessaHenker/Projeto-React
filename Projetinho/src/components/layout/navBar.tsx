import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <nav>
        <li><Link to="/">Home</Link></li>
       <li><Link to="/contact">Contato</Link></li>
       <li><Link to="/company">Empresa</Link></li>
       <li><Link to="/newproject">Novo projeto</Link></li>
      </nav>
    </div>
  )
}

export default NavBar;
