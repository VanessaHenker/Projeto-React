// ProjectForm.tsx
import React, { useState, useEffect } from 'react';
import Input from '../form/input';
import Select from '../form/select';
import SubmitButton from '../form/submitButton';
import styles from './projectForm.module.css';

// Definindo os tipos dos dados esperados
interface Category {
  id: number;
  name: string;
}

interface OrcamentoType {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  orcamento_id: number;
  categoryId: number;
}

// Definindo a interface das props do ProjectForm
interface ProjectFormProps {
  handleSubmit: (updatedProject: Project) => Promise<void>;
  btn: string;
  projectData: Project;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ handleSubmit, btn, projectData }) => {
  const [formData, setFormData] = useState({
    name: projectData.name,
    orcamento_id: projectData.orcamento_id,
    categoryId: projectData.categoryId,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, orcamentosRes] = await Promise.all([
          fetch("http://localhost:5000/categories").then((res) => res.json()),
          fetch("http://localhost:5000/orcamentos").then((res) => res.json()),
        ]);
        setCategories(categoriesRes);
        setOrcamentos(orcamentosRes);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleSubmit(formData);
    } catch (error) {
      console.error("Erro ao enviar dados", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <Input
        type="text"
        text="Nome do projeto:"
        name="name"
        placeholder="Insira o nome do projeto"
        value={formData.name}
        handleOnChange={handleInputChange}
      />
      <Select
        type="select"
        text="Selecione a categoria:"
        name="categoryId"
        value={formData.categoryId}
        handleOnChange={handleInputChange}
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
      />
      <Select
        type="select"
        text="Selecione o orçamento:"
        name="orcamento_id"
        value={formData.orcamento_id}
        handleOnChange={handleInputChange}
        options={orcamentos.map((orcamento) => ({
          value: orcamento.id,
          label: orcamento.name,
        }))}
      />
      <SubmitButton text={btn} />
    </form>
  );
};

export default ProjectForm;
