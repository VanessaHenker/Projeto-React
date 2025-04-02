import styles from './projectForm.module.css';
import Input from '../form/input';
import Select from '../form/select';
import { useState } from 'react';

interface ProjectFormProps {
  handleSubmit: (project: Project) => void;
  btnText: string;
  projectData?: Project;
}

interface Project {
  name: string;
  budget: string;
  category: string;
}

function ProjectForm({ handleSubmit, btnText, projectData }: ProjectFormProps) {
  const [project, setProject] = useState<Project>(
    projectData || { name: '', budget: '', category: '' }
  );

  const categories = [
    { value: 'infra', label: 'Infraestrutura' },
    { value: 'dev', label: 'Desenvolvimento' },
    { value: 'design', label: 'Design' },
    { value: 'planning', label: 'Planejamento' }
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
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
        value={project.budget}
      />

      <Select
        type="select"
        text="Selecione uma categoria"
        name="category"
        handleOnChange={handleChange}
        value={project.category}
        options={categories}
      />

      <button type="submit" className={styles.btn}>{btnText}</button>
    </form>
  );
}

export default ProjectForm;
