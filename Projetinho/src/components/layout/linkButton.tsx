import { Link } from 'react-router-dom';
import styles from './layout/LinkButton.module.css';

interface LinkButtonProps {
    to: string; 
    text: string;
}

const LinkButton = ({ to, text }: LinkButtonProps) => {
    return (
        <Link to={to} className={styles.btn}>
            {text}
        </Link>
    );
};

export default LinkButton;
