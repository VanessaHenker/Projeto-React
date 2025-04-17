import styles from './projectForm.module.css';
import Input from '../form/input';
import Select from '../form/select';
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
    id: projectData?.id || undefined,
    name: projectData?.name || '',
    budget: projectData?.budget || 0,
    categoryId: projectData?.categoryId || '',
    orcamento_id: projectData?.orcamento_id || '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoOption[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(err => console.error("Erro ao carregar categorias:", err));

    fetch('http://localhost:5000/orcamentos')
      .then(res => res.json())
      .then(setOrcamentos)
      .catch(err => console.error("Erro ao carregar orçamentos:", err));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: name === 'budget' ? Number(value) : value,
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!project.name || !project.budget || !project.categoryId || !project.orcamento_id) {
      alert("Preencha todos os campos.");
      return;
    }

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

      <Input
        type="number"
        text="Orçamento estimado"
        name="budget"
        placeholder="Insira o orçamento"
        handleOnChange={handleChange}
        value={project.budget}
      />

      <Select
        text="Selecione um orçamento"
        name="orcamento_id"
        value={project.orcamento_id || ''}
        handleOnChange={handleChange}
        options={orcamentos.map(o => ({ value: o.id, label: o.name }))}
      />

      <Select
        text="Selecione uma categoria"
        name="categoryId"
        value={project.categoryId || ''}
        handleOnChange={handleChange}
        options={categories.map(c => ({ value: c.id, label: c.name }))}
      />

      <SubmitButton text={btnText} type="submit" />
    </form>
  );
}

export default ProjectForm;
