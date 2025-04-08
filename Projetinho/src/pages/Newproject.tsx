import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/projects/projectForm';
import styles from './NewProject.module.css';

interface RawProject {
  name: string;
  categoryId?: string;
  orcamento_id: string;
}

interface FinalProject {
  id: string;
  name: string;
  budget: number;
  categoryId?: string;
}

function NewProject() {
  const navigate = useNavigate();

  const createProject = async (project: RawProject) => {
    try {
      const newProject: FinalProject = {
        id: Math.random().toString(36).substr(2, 9),
        name: project.name,
        categoryId: project.categoryId,
        budget: parseFloat(project.orcamento_id), // transforma orcamento_id (string) em number
      };

      const response = await fetch('http://localhost:5000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) throw new Error('Erro ao criar o projeto');

      navigate('/projects');
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    }
  };

  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createProject} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
