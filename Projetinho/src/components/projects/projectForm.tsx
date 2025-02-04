import { useState, useEffect } from 'react';

import Input from '../form/input';
import Select from '../form/select';
import SubmitButton from '../form/submitButton';

import styles from './projectForm.module.css';

function ProjectForm() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
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
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Erro na requisição: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        console.log("Categorias recebidas:", data); // Log para depuração
        setCategories(data);
      })
      .catch(err => console.error("Erro ao buscar categorias:", err));
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

      <Select
        type="select"
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
        key={categories.length} // Força re-renderização quando a lista muda
        type="select"
        text='Selecione a categoria:'
        name='categoryId'
        handleOnChange={handleInputChange}
        value={formData.categoryId}
        options={categories.map((category) => ({
          value: String(category.id), // Converte o ID para string
          label: category.name,
        }))}
      />

      <SubmitButton text='Criar projeto'/>
    </form>
  );
}

export default ProjectForm;
