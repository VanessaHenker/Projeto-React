import React from 'react';
import styles from './orcamentoCard.module.css';

interface Option {
  value: string;
  label: string;
}

interface OrcamentoProps {
  text: string;
  name: string;
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
  options?: Option[];
  placeholder?: string;
}

function Orcamento({
  text,
  name,
  handleOnChange,
  value,
  options,
  placeholder = 'Selecione...',
}: OrcamentoProps) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}</label>

      <select
        id={name}
        name={name}
        onChange={handleOnChange}
        value={value || ''}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Orcamento;
