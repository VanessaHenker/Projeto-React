import Input from '../form/input';
import styles from './projectForm.module.css';
import { useState } from 'react';

function ProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        text="Nome do projeto:"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleInputChange}
      />

   

      <div className={styles.formControl}>
        <button type="submit" className={styles.btn}>
          Criar Projeto
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
