import Input from '../form/input';
import Select from '../form/select';
import styles from './projectForm.module.css';
import { useState } from 'react';

function ProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    categorId: '',
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
        value={formData.name}
      />

      <Input
        type="select"
        text="Orçamento do projeto:"
        name="budget"
        options={[
          { value: '', label: 'Selecione o orçamento:' },
          { value: '1000', label: 'R$ 1.000' },
          { value: '5000', label: 'R$ 5.000' },
          { value: '10000', label: 'R$ 10.000' },
        ]}
        handleOnChange={handleInputChange}
        value={formData.budget}
      />

      <Select 
        type='select'
        text='Selecione a categoria:'
        name='categoryId'
        placeholder='Selecione a opção'
        options={[
          { value: '', label: 'Selecione a opção' },
          { value: '1', label: 'Marketing' },
          { value: '2', label: 'Marketing' },
          { value: '3', label: 'Marketing' },
        ]}
        handleOnChange={handleInputChange}
        value={formData.categorId}
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
