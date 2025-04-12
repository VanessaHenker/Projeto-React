import React from "react";

type Option = {
  id: number | string;
  name: string;
};

type SelectProps = {
  name: string;
  text: string;
  options: Option[];
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: number | string;
  required?: boolean;
  className?: string;
};

function Select({
  name,
  text,
  options,
  handleOnChange,
  value = "",
  required = false,
  className = "",
}: SelectProps) {
  return (
    <div className={`input-container ${className}`}>
      <label htmlFor={name}>{text}</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value}
        required={required}
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
