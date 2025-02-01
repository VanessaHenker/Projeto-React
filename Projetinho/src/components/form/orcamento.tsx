import styles from './select.module.css';


interface OrcamentoProps {
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  valueOrcamento?: string | number;
  valueCodigo?: string | number;
  options: Option[];
}


function Orcamento({ text, name, placeholder, handleOnChange, valueOrcamento, valueCodigo, options }: OrcamentoProps) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}</label>
      <select id={name} name={name} onChange={handleOnChange} value={valueOrcamento || ''}>
        <option value="">Selecione um orçamento</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        name={`${name}_codigo`}
        id={`${name}_codigo`}
        placeholder={placeholder || 'Código'}
        onChange={handleOnChange}
        value={valueCodigo}
      />
    </div>
  );
}
export default Orcamento
