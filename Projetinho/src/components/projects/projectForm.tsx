import styles from './projectForm.module.css';
import Input from '../form/input';
import Select from '../form/select';
import Orcamento from '../form/orcamento';
import SubmitButton from '../form/submitButton';
import { useState, useEffect } from 'react';

interface Project {
  id?: string;
  name: string;
  budget: number;
  categoryId?: string;
  orcamento_id?: string;
}

interface Category {
  id: string;
  name: string;
}

interface OrcamentoOption {
  id: string;
  name: string;
}

interface ProjectFormProps {
  handleSubmit: (project: Project) => void;
  btnText: string;
  projectData?: Project;
}

function ProjectForm({ handleSubmit, btnText, projectData }: ProjectFormProps) {
  const [project, setProject] = useState<Project>({
    id: projectData?.id || '',
    name: projectData?.name || '',
    budget: projectData?.budget || 0,
    categoryId: projectData?.categoryId || '',
    orcamento_id: projectData?.orcamento_id || '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoOption[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then(response => response.json())
      .then(setCategories)
      .catch(error => console.error('Erro ao carregar categorias:', error));

    fetch('http://localhost:5000/orcamentos')
      .then(response => response.json())
      .then(setOrcamentos)
      .catch(error => console.error('Erro ao carregar orçamentos:', error));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: name === 'budget' ? Number(value) : value,
    }));
  }

  function isFormValid(): boolean {
    const { name, budget, orcamento_id, categoryId } = project;

    return (
      name.trim() !== '' &&
      !isNaN(budget) &&
      Number(budget) > 0 &&
      orcamento_id?.trim() !== '' &&
      categoryId?.trim() !== ''
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    console.log('Formulário submetido');

    if (!isFormValid()) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    console.log('Dados do projeto enviados:', project);
    handleSubmit(project);
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name}
      />

      <Orcamento
        text="Selecione um orçamento"
        name="orcamento_id"
        handleOnChange={handleChange}
        value={project.orcamento_id || ''}
        options={orcamentos.map(o => ({ value: o.id, label: o.name }))}
        placeholder="Escolha um orçamento"
      />

      <Select
        text="Selecione uma categoria"
        name="categoryId"
        handleOnChange={handleChange}
        value={project.categoryId || ''}
        options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
      />

      <SubmitButton text={btnText || 'Criar Projeto'} type="submit" />
    </form>
  );
}

export default ProjectForm;
