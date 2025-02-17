import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../pages/projects.module.css';
import Message from '../components/layout/message';
import Container from '../components/layout/container';
import LinkButton from '../components/layout/linkButton';
import ProjectCard from '../components/projects/projectCard';

interface Project {
  id: number;
  name: string;
  budget: number;
  category: string;
  orcamento_id: number;
}

interface Budget {
  id: number;
  name: number; // Nome aqui será o valor do orçamento
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
      .then((data: { projects: Project[]; orcamentos: Budget[] }) => {
        const updatedProjects = data.projects.map((project) => {
          // Buscar o orçamento correspondente usando o orcamento_id
          const budget = data.orcamentos.find(
            (orcamento) => orcamento.id === project.orcamento_id
          );
          
          // Se encontrado, associar o orçamento real ao projeto
          return {
            ...project,
            budget: budget ? budget.name : 0, // Definir 0 caso não encontre o orçamento
          };
        });

        setProjects(updatedProjects);
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
