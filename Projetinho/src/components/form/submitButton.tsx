import styles from './submitButton.module.css';

interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  return (
    <button className={styles.btn}>
      {text}
    </button>
  );
}
