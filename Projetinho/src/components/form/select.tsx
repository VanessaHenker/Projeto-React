import styles from './select.module.css';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  type: string;
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  value?: string | number;
  options?: Option[];
}

function Select({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  options,
}: SelectProps) {
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
          aria-placeholder={placeholder} // Melhorando a acessibilidade do campo
        />
      )}
    </div>
  );
}

export default Select;
