import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

import styles from './layout/footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.socialList}>
        <li>
          <FaFacebook />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaLinkedin />
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
