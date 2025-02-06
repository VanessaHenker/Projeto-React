import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/projects/projectForm';
import styles from './NewProject.module.css';

function NewProject() {
  const navigate = useNavigate(); 

  function handleCreateProject() {
    navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } });
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm />
      <button onClick={handleCreateProject}>Criar Projeto</button>
    </div>
  );
}

export default NewProject;
