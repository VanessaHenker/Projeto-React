import styles from './projectForm.module.css';
import Input from '../form/input';
import Select from '../form/select';
import SubmitButton from '../form/submitButton';
import { useState, useEffect } from 'react';

interface Project {
  id?: number;
  name: string;
  budget: number;
  category: string;
  categoryId?: number;
  orcamento_id?: number;
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
    category: projectData?.category || '',
    categoryId: projectData?.categoryId || undefined,
    orcamento_id: projectData?.orcamento_id || undefined,
  });

  useEffect(() => {
    if (projectData) {
      setProject({
        id: projectData.id,
        name: projectData.name,
        budget: Number(projectData.budget),
        category: projectData.category,
        categoryId: projectData.categoryId,
        orcamento_id: projectData.orcamento_id,
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
      [name]: name === 'budget' ? Number(value) : value,
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!project.name || !project.category || project.budget <= 0) {
      alert('Preencha todos os campos corretamente.');
      return;
    }
    handleSubmit(project);
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type='text'
        text='Nome do projeto'
        name='name'
        placeholder='Insira o nome do projeto'
        handleOnChange={handleChange}
        value={project.name}
      />

      <Input
        type='number'
        text='Orçamento do projeto'
        name='budget'
        placeholder='Insira o orçamento total'
        handleOnChange={handleChange}
        value={project.budget.toString()}
      />

      <Select
        text='Selecione uma categoria'
        name='category'
        handleOnChange={handleChange}
        value={project.category}
        options={categories}
      />

      <SubmitButton text={btnText} type='submit' />
    </form>
  );
}

export default ProjectForm;
