import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/projects/projectForm';
import styles from './newProject.module.css';

// Definição da interface para o projeto
interface Project {
  name: string;
  budget: number;
  cost: number;
  services: any[]; 
}

function NewProject() {
  const navigate = useNavigate();

  function createPost(project: Project) {
    // Inicializa cost e services corretamente
    project.cost = 0;
    project.services = [];

    fetch('http://localhost:5000/projects', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("Projeto criado:", data);
      navigate('/alguma-rota'); 
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
    
      <ProjectForm handleSubmit={createPost} />
    </div>
  );
}

export default NewProject;
