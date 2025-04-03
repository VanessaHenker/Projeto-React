import styles from './submitButton.module.css';

interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'submit' | 'button';
}

export default function SubmitButton({ text, onClick, type = 'button' }: SubmitButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick} type={type}>
      {text}
    </button>
  );
}
