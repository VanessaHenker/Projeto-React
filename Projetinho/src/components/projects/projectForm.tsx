import styles from './projectForm.module.css';
import Input from '../form/input';
import Select from '../form/select';
import SubmitButton from '../form/submitButton';
import { useState, useEffect } from 'react';

interface Project {
  name: string;
  budget: number; // Mudando para number
  category: string;
}

interface ProjectFormProps {
  handleSubmit: (project: Project) => void;
  btnText: string;
  projectData?: Project;
}

function ProjectForm({ handleSubmit, btnText, projectData }: ProjectFormProps) {
  const [project, setProject] = useState<Project>({
    name: '',
    budget: 0, // Garantindo que seja um número
    category: ''
  });

  useEffect(() => {
    if (projectData) {
      setProject({
        name: projectData.name,
        budget: Number(projectData.budget), // Convertendo para número
        category: projectData.category
      });
    }
  }, [projectData]);

  const categories = [
    { value: 'infra', label: 'Infraestrutura' },
    { value: 'dev', label: 'Desenvolvimento' },
    { value: 'design', label: 'Design' },
    { value: 'planning', label: 'Planejamento' }
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: name === 'budget' ? Number(value) : value // Convertendo apenas budget para número
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!project.name || !project.category || project.budget <= 0) {
      alert("Preencha todos os campos corretamente.");
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
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget.toString()} // Convertendo para string
      />

      <Select
        text="Selecione uma categoria"
        name="category"
        handleOnChange={handleChange}
        value={project.category}
        options={categories}
      />

      <SubmitButton text={btnText} type="submit" />
    </form>
  );
}

export default ProjectForm;
