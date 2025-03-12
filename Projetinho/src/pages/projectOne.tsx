import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './projectOne.module.css';
import Loading from '../components/layout/loading';

interface Project {
  name: string;
  description: string;
}

function ProjectOne() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setProject(data))
        .catch((err) => console.error('Erro ao buscar o projeto:', err));
    }, 300); 
  }, [id]);

  if (!project) {
    return <Loading />; 
  }

  return (
    <div className={styles.projectContainer}>
      <h1 className={styles.projectTitle}>{project.name}</h1>
      <p className={styles.projectDescription}>{project.description}</p>
    </div>
  );
}

export default ProjectOne;
