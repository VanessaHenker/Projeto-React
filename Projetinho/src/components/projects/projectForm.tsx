import { useState, useEffect } from 'react';

import Input from '../form/input';
import Select from '../form/select';
import SubmitButton from '../form/submitButton';

import styles from './projectForm.module.css';
import Orcamento from '../form/orcamento';

function ProjectForm() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [orcamentos, setOrcamentos] = useState<{ id: string; name: string }[]>([]);
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
        setCategories(data.categories);
        setOrcamentos(data.orcamentos);
      })
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

      <Orcamento
        type="select"
        text="Selecione o orçamento"
        name="budget"
        handleOnChange={handleInputChange}
        value={formData.budget}
        options={orcamentos.map((orcamento) => ({
          value: orcamento.id,
          label: orcamento.name,
        }))}
      />

      <Select
        type="select"
        text="Selecione a categoria:"
        name="categoryId"
        handleOnChange={handleInputChange}
        value={formData.categoryId}
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
      />

      <SubmitButton text='Criar projeto' />
    </form>
  );
}

export default ProjectForm;
