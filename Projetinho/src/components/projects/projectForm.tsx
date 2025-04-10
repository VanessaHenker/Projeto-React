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
    id: projectData?.id || undefined,
    name: projectData?.name || '',
    budget: projectData?.budget || 0,
    categoryId: projectData?.categoryId || '',
    orcamento_id: projectData?.orcamento_id || '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // evita envios duplicados

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Erro ao carregar categorias:', error));

    fetch('http://localhost:5000/orcamentos')
      .then(response => response.json())
      .then(data => setOrcamentos(data))
      .catch(error => console.error('Erro ao carregar orçamentos:', error));
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

    if (isSubmitting) return;

    const { orcamento_id } = project;

    console.log('orcamento_id:', orcamento_id);
    console.log('Dados completos do projeto:', project);

    if (!orcamento_id) {
      alert('Preencha o campo de orçamento corretamente.');
      return;
    }

    const newProject = { ...project };

    if (!newProject.id) {
      newProject.id = Math.random().toString(36).substr(2, 9);
    }

    setIsSubmitting(true);

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('Projeto criado com sucesso:', data);
        handleSubmit(data);
      })
      .catch(err => console.error('Erro ao criar projeto:', err))
      .finally(() => setIsSubmitting(false));
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

      <Orcamento
        text="Selecione um orçamento"
        name="orcamento_id"
        handleOnChange={handleChange}
        value={project.orcamento_id || ''}
        options={orcamentos.map(o => ({ value: o.id, label: o.name }))}
        placeholder="Escolha um orçamento"
      />

      <Select
        text='Selecione uma categoria'
        name='categoryId'
        handleOnChange={handleChange}
        value={project.categoryId || ''}
        options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
      />

      <SubmitButton
        text={btnText || 'Criar Projeto'}
        type='submit'
      />
    </form>
  );
}

export default ProjectForm;
