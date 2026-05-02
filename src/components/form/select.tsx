import styles from './select.module.css';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  text: string;
  name: string;
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  options: Option[];
}

function Select({ text, name, handleOnChange, value, options }: SelectProps) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}</label>
      <select id={name} name={name} onChange={handleOnChange} value={value || ''}>
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
