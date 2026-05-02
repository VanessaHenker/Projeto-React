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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!project.orcamento_id) {
      alert('Preencha o campo de orçamento corretamente.');
      return;
    }

    setIsSubmitting(true);

    const method = projectData ? 'PATCH' : 'POST';
    const url = projectData
      ? `http://localhost:5000/projects/${project.id}`
      : 'http://localhost:5000/projects';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });

      const data = await response.json();
      console.log('Projeto salvo com sucesso:', data);
      handleSubmit(data);
    } catch (err) {
      console.error('Erro ao salvar projeto:', err);
    } finally {
      setIsSubmitting(false);
    }
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

      <Select
        text='Selecione um orçamento'
        name='orcamento_id'
        handleOnChange={handleChange}
        value={project.orcamento_id || ''}
        options={orcamentos.map(o => ({ value: o.id, label: o.name }))}
      />

      <Select
        text='Selecione uma categoria'
        name='categoryId'
        handleOnChange={handleChange}
        value={project.categoryId || ''}
        options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
      />

      <SubmitButton text={btnText || 'Criar Projeto'} type='submit' />
    </form>
  );
}

export default ProjectForm;