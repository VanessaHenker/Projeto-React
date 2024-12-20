import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <div>
      <footer>
        <ul>
          <li><FaFacebook/></li>
          <li><FaInstagram/></li>
          <li><FaLinkedin/></li>
        </ul>
        <p>Nosso rodape</p>
      </footer>
    </div>
  );
}

export default Footer;
