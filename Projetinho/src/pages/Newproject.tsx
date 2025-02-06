import { useHistory } from 'react-router-dom';

import ProjectForm from '../components/projects/projectForm';
import styles from './newProject.module.css';

function NewProject() {

  const history = useHistory()

  function createPost(project){
      // initialize cost and service
      project.cost = 0
      project.cost = []
      
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm/>
    </div>
  );
}

export default NewProject;
