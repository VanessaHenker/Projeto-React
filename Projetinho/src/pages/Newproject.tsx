import { useNavigate } from 'react-router-dom';

import ProjectForm from '../components/projects/projectForm';
import styles from './newProject.module.css';

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    project.cost = 0;
    project.service = [];

    fetch("http://localhost:5000/projects", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Projeto criado:", data);
        navigate("/projetos"); // Redireciona após criação
      })
      .catch((err) => console.error("Erro ao criar projeto:", err));
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm onSubmit={createPost} />
    </div>
  );
}

export default NewProject;
