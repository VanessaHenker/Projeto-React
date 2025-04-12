type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string | number;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  name,
  type,
  placeholder,
  value,
  handleOnChange,
}: InputProps) {
  return (
    <div className="input-container">
      <label htmlFor={name}>{placeholder}</label>
      <input
        name={name}
        type={type}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default Input;
