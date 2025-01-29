import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ProjectForm from '../components/projects/projectForm';
import styles from './newProject.module.css';

function NewProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function createPost(project) {
    setLoading(true);
    const newProject = {
      ...project,
      cost: 0,
      services: [],
    };

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Projeto criado:', data);
        navigate('/projetos'); // Redireciona após criação
      })
      .catch((err) => {
        console.error('Erro ao criar projeto:', err);
        alert('Erro ao criar projeto. Tente novamente mais tarde.');
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      {/* Passa a função `createPost` para o formulário */}
      <ProjectForm onSubmit={createPost} loading={loading} />
    </div>
  );
}

export default NewProject;
