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
    setTimeout(() =>)
  }, [id]);

  if (!project) {
    return <p>Carregando...</p>;
  }

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
