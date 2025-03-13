import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './projectOne.module.css';
import Loading from '../components/layout/loading';

interface Project {
  name: string;
  description: string;
}

function ProjectOne() {
  const { id } = useParams<{ id: string }>(); // Defina o tipo explicitamente para garantir que id é uma string.
  const [project, setProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    if (id) { // Garante que o id não é undefined
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setProject(data))
        .catch((err) => console.error('Erro ao buscar o projeto:', err));
    }
  }, [id]);

  if (!project) {
    return <Loading />;
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <div className={styles.projectContainer}>
      <h1 className={styles.projectTitle}>{project.name}</h1>
      <p className={styles.projectDescription}>{project.description}</p>
      <button onClick={toggleProjectForm}>
        {!showProjectForm ? 'Editar projeto' : 'Fechar'}
      </button>
    </div>
  );
}

export default ProjectOne;
