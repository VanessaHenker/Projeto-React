import Input from '../form/input';
import styles from './projectForm.module.css';
import { useState } from 'react';

interface InputProps {
  type: 'text' | 'select';
  text: string;
  name: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function Input({ type, text, name, placeholder, options, handleOnChange }: InputProps) {
  return (
    <div>
      <label htmlFor={name}>{text}</label>
      {type === 'text' && (
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onChange={handleOnChange}
        />
      )}
      {type === 'select' && options && (
        <select id={name} name={name} onChange={handleOnChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
