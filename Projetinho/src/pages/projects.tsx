import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../pages/projects.module.css';
import Message from '../components/layout/message';
import Container from '../components/layout/container';
import LinkButton from '../components/layout/linkButton';
import ProjectCard from '../components/projects/projectCard';

// Atualizando as interfaces para permitir que o ID seja string ou número
interface Project {
  id: string | number;
  name: string;
  budget: number;
  category: string;
  orcamento_id: string | number;
}

interface Budget {
  id: string | number;
  name: number; // O valor do orçamento
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
      .then((data: { projects: Project[]; orcamentos: Budget[]; categories: any[] }) => {
        const updatedProjects = data.projects.map((project) => {
          // Buscar o orçamento correspondente usando o orcamento_id
          const budget = data.orcamentos.find(
            (orcamento) => orcamento.id === project.orcamento_id
          );

          // Mapear o category_id para o nome da categoria
          const category = data.categories.find(
            (category) => category.id === project.category_id
          );

          return {
            ...project,
            budget: budget ? budget.name : 0,
            category: category ? category.name : 'Não definida',
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
