import styles from './input.module.css';

interface Option {
  value: string;
  label: string;
}

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'select'; 
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value?: string | number;
  options?: Option[];
  autoComplete?: string;  
}

function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  options,
  autoComplete = 'off', 
}: InputProps) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}</label>
      {type === 'select' && options ? (
        <select id={name} name={name} onChange={handleOnChange} value={String(value || '')}>
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
          value={value || ''}
          autoComplete={autoComplete}  
        />
      )}
    </div>
  );
}

export default Input;
