
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from '../pages/projects.module.css';

import Message from '../components/layout/message';
import Container from '../components/layout/container';
import LinkButton from '../components/layout/linkButton';
import ProjectCard from '../components/projects/projectCard';

// Definindo a interface do projeto
interface Project {
  id: number;
  name: string;
  budget: number;
  category: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || '';

  useEffect(() => {
    if (message) {
      navigate('.', { replace: true });
    }

    // Requisição para buscar os projetos
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
      .then((data: any[]) => {
        // Verifica se não há projetos e insere um projeto modelo
        if (data.length === 0) {
          const defaultProject = {
            id: 1,
            name: 'Projeto Modelo',
            budget: 1000.0,
            category: 'Desenvolvimento',
          };
          setProjects([defaultProject]); // Adiciona o projeto modelo
        } else {
          // Caso haja projetos, os adiciona normalmente
          const updatedProjects = data.map((project) => ({
            ...project,
            budget: parseFloat(project.budget.replace(/[^\d,-]/g, '').replace(',', '.')),
          }));
          setProjects(updatedProjects);
        }
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

      <div className={styles.projectsCreate}>
        <Container>
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                budget={project.budget}
                category={project.category}
                handleRemove={(id) => {
                  const updatedProjects = projects.filter((p) => p.id !== id);
                  setProjects(updatedProjects);
                }}
              />
            ))
          ) : (
            <p>Não há projetos cadastrados.</p>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Projects;
