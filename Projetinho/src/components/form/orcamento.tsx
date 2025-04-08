import React from 'react';
import styles from './orcamentoCard.module.css';

interface Option {
  value: string;
  label: string;
}

interface OrcamentoProps {
  type: string;
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  value?: string | number;
  options?: Option[];
}

function Orcamento({
  type,
  text,
  name,
  handleOnChange,
  value,
  options,
}: OrcamentoProps) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}</label>

      {type === 'select' && options && (
        <select id={name} name={name} onChange={handleOnChange} value={value || ''}>
          <option value='' disabled>
            Selecione...
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {type !== 'select' && (
        <input
          id={name}
          name={name}
          type={type}
          onChange={handleOnChange}
          value={value}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default Orcamento;
