import styles from './projectForm.module.css';
import Input from '../form/input';
import Select from '../form/select';
import SubmitButton from '../form/submitButton';
import Orcamento from '../form/orcamento';
import { useState, useEffect } from 'react';

interface Project {
  id?: string;
  name: string;
  categoryId?: string;
  orcamento_id?: string;
}

interface Category {
  id: string;
  name: string;
}

interface OrcamentoOption {
  value: string;
  label: string;
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
    categoryId: projectData?.categoryId || undefined,
    orcamento_id: projectData?.orcamento_id || undefined,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoOption[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Erro ao carregar categorias:', error));

    fetch('http://localhost:5000/orcamentos')
      .then(res => res.json())
      .then(data => {
        const options = data.map((o: { id: string, name: string }) => ({
          value: o.id,
          label: o.name,
        }));
        setOrcamentos(options);
      })
      .catch(err => console.error('Erro ao carregar orçamentos:', err));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!project.name || !project.categoryId || !project.orcamento_id) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    if (!project.id) {
      project.id = Math.random().toString(36).substr(2, 9);
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

      
      <Orcamento
        type="select"
        text="Selecione o orçamento"
        name="orcamento_id"
        handleOnChange={handleChange}
        value={project.orcamento_id || ''}
        options={orcamentos}
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
