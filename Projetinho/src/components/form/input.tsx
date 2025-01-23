import styles from './input.module.css';

interface InputProps {
  type: string;
  text: string;
  name: string;
  placeholder: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
}

function Input({ type, text, name, placeholder, handleOnChange, value }: InputProps) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
}

export default Input;
