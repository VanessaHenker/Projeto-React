import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css'; // Caminho corrigido

interface LinkButtonProps {
  to: string;
  text: string;
}

const LinkButton = ({ to, text }: LinkButtonProps) => {
  return (
    <Link to={to} className={styles.btn}>
      {text}
      <h1>ola</h1>
    </Link>
  );
};

export default LinkButton;
