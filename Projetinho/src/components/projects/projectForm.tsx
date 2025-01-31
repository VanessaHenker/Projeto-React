import { useState } from 'react';

import Input from '../form/input';
import Select from '../form/select';
import SubmitButton from '../form/submitButton';

import styles from './projectForm.module.css';

function ProjectForm() {

  const [categories, setCategories] = useState([])

  fetch ("http:localhost:500/categories", {
    method: "GET",
    headers: {
      "Content-Type": 'application/json'
    }
  }).then()
  .catch(err => console.log(err))

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

        ]}
        handleOnChange={handleInputChange}
        value={formData.categorId}
      />

      <SubmitButton text='Criar projeto'/>
    </form>
  );
}

export default ProjectForm;
