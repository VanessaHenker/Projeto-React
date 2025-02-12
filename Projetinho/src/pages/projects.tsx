import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from '../pages/projects.module.css';

import Message from '../components/layout/message';
import Container from '../components/layout/container';
import LinkButton from '../components/layout/linkButton';

function Projects() {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || '';

  useEffect(() => {
    if (message) {
      navigate('.', { replace: true });
    }

    fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar projetos');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => {
        console.error('Erro na requisição:', err);
      });
  }, [message, navigate]);

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus Projetos</h1>
        <LinkButton text="Criar Projeto" to="/criar-projeto" />
      </div>

      {message && <Message type="success" msg={message} />}

      <Container>
        {projects.leght > 0 &&
          projects.leght.mapa((project) =>
            <ProjectCard />
          )}
      </Container>
    </div>
  );
}

export default Projects;
