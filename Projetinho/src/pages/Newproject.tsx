import {useHistory} from 'react-router-dom'

import ProjectFrom from '../components/projects/projectForm';
import styles from './newProject.module.css';

function Newproject (){

  const history = useHistory()  

  function crearePost(project){
    project.cost = 0;
    project.service = []

    


  }

  
  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectFrom/>
    </div>

  )
}

export default Newproject