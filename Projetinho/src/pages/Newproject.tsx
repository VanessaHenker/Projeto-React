import { useHistory } from 'react-router-dom';

import ProjectForm from '../components/projects/projectForm';
import styles from './newProject.module.css';

function NewProject() {

  const history = useHistory()

  function createPost(project){
      //initialize cost and service
      project.cost = 0
      project.service = []

      fetch("http:/localhost:5000/project", {
      method: 'POST',
      headers: {
        'Cpntent-type': 'application/json',
      },
    }).then(),catch(resp => Response.json )
    .then((data) => {
      //rediret
    })
      .catch(err => console.log(err))
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
