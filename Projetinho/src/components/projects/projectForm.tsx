import Input from '../form/input';
import styles from './projectForm.module.css';
import { useState } from 'react';

function ProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    category: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.budget || !formData.category) {
      setError('Todos os campos devem ser preenchidos.');
      return;
    }

    setError('');
    console.log('Formulário enviado com sucesso!', formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        onChange={handleInputChange}
      />

      <Input
        type="number"
        text="Orçamento Total"
        name="budget"
        placeholder="Insira o orçamento total"
        onChange={handleInputChange}
      />

      <div className={styles.formControl}>
        <label htmlFor="category">Categoria:</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Selecione a categoria
          </option>
          <option value="design">Design</option>
          <option value="development">Desenvolvimento</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      <div className={styles.formControl}>
        <button type="submit" className={styles.btn}>
          Criar Projeto
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
