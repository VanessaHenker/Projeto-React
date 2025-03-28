import styles from './input.module.css';

interface Option {
  value: string;
  label: string;
}

interface InputProps {
  type: string; 
  text: string;
  name: string;
  placeholder?: string; 
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value?: string | number;
  options?: Option[]; 
  autoComplete?: string;  // Adicionando a propriedade autoComplete
}

function Input({
  type, 
  text, 
  name, 
  placeholder, 
  handleOnChange, 
  value, 
  options, 
  autoComplete  // Recebendo a propriedade autoComplete
}: InputProps) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}</label>
      {type === 'select' && options ? (
        <select id={name} name={name} onChange={handleOnChange} value={value || ''}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          autoComplete={autoComplete}  // Passando a propriedade autoComplete para o input
        />
      )}
    </div>
  );
}

export default Input;
