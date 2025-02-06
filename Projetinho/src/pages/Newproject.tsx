import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/projects/ProjectForm';
import styles from './NewProject.module.css';

// Interface para representar um serviço dentro do projeto
interface Service {
  id: number;
  name: string;
  cost: number;
  description: string;
}

// Interface para representar um projeto
interface Project {
  name: string;
  budget: number;
  cost: number;
  services: Service[];
}

function NewProject() {
  const navigate = useNavigate();

  function createPost(project: Project) {
    // Inicializa cost e services 
    project.cost = 0;
    project.services = [];

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Projeto criado:', data);
        navigate('/alguma-rota'); // Redirecione para a página desejada
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit = {createPost} />
    </div>
  );
}

export default NewProject;
