import styles from './input.module.css';

function Input({
  type,
  text,
  name,
  placeholder,
  options,
  handleOnChange,
}: InputProps) {
  return (
    <div className={styles.inputControl}>
      <label htmlFor={name}>{text}</label>
      {type === 'select' && options ? (
        <select id={name} name={name} onChange={handleOnChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={handleOnChange}
        />
      )}
    </div>
  );
}

export default Input;
