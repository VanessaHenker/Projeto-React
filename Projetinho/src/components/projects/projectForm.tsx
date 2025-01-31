import { useState } from 'react';

import Input from '../form/input';
import Select from '../form/select';
import SubmitButton from '../form/submitButton';

import styles from './projectForm.module.css';

function ProjectForm() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    categoryId: '',
  });

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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

      <Select
        text="Orçamento do projeto:"
        name="budget"
        handleOnChange={handleInputChange}
        value={formData.budget}
        options={[ 
          { value: '', label: 'Selecione o orçamento:' },
          { value: '1000', label: 'R$ 1.000' },
          { value: '5000', label: 'R$ 5.000' },
          { value: '10000', label: 'R$ 10.000' },
        ]}
      />

      <Select 
        text='Selecione a categoria:'
        name='categoryId'
        handleOnChange={handleInputChange}
        value={formData.categoryId}
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
      />

      <SubmitButton text='Criar projeto'/>
    </form>
  );
}

export default ProjectForm;
