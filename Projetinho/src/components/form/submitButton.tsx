import styles from './submitButton.module.css'; 

interface SubmitButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

function SubmitButton({ text, type = 'submit', disabled = false }: SubmitButtonProps) {
  return (
    <button 
      type={type} 
      disabled={disabled} 
      className={`${styles.submitButton} ${disabled ? styles.disabled : ''}`} // Adicionando estilos
    >
      {text}
    </button>
  );
}

export default SubmitButton;
