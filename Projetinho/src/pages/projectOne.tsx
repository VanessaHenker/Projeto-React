import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProjectOne() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error('Erro ao buscar o projeto:', err));
  }, [id]);

  if (!project) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectOne;
