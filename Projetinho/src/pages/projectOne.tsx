import styles from './projectOne.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProjectOne() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);

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

  return (
    <div className={styles.projectContainer}>
      <h1>{project.name}</h1>
    </div>
  );
}

export default ProjectOne;
