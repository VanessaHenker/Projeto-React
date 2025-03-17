import styles from './projectOne.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../components/layout/container';

function ProjectOne() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [showProjectForm, setShowProjectForm] = useState(false)

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
        })
        .catch((error) => console.error('Erro ao buscar o projeto:', error));
    }
  }, [id]);

  if (!project) {
    return <div>Carregando projeto...</div>;
  }

  function toggleProjectForm (){

  }

  return (
   <>
    {project.name ? (
      <div>
        <Container>
          <div>
            <h1>Projeto: {project.name}</h1>
            <button onclick {toggleProjectForm}>Editar projeto</button>
          </div>
        </Container>
      </div>
    ) : (

    )}
   </>
  );
}

export default ProjectOne;
