import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../pages/projects.module.css';
import Message from '../components/layout/message';
import Container from '../components/layout/container';
import LinkButton from '../components/layout/linkButton';
import ProjectCard from '../components/projects/projectCard';

interface Project {
  id: number | string;
  name: string;
  budget: number;
  category_id: number | string;
  orcamento_id: number | string;
  category?: string; // Adicionando a categoria ao projeto
}

interface Budget {
  id: number | string;
  name: number; // Orçamento (valor)
}

interface Category {
  id: number | string;
  name: string;
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

    // Buscando projetos, orçamentos e categorias
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
      .then((data: { projects: Project[]; orcamentos: Budget[]; categories: Category[] }) => {
        // Debug: Verifique os dados recebidos
        console.log('Dados recebidos:', data);

        if (!data.projects || !data.orcamentos || !data.categories) {
          console.error("Dados incompletos na resposta da API");
          return;
        }

        // Associar orçamento e categoria ao projeto
        const updatedProjects = data.projects.map((project) => {
          // Buscar o orçamento correspondente usando o orcamento_id
          const budget = data.orcamentos.find(
            (orcamento) => String(orcamento.id) === String(project.orcamento_id)
          );

          // Buscar a categoria correspondente usando o category_id
          const category = data.categories.find(
            (category) => String(category.id) === String(project.category_id)
          );

          // Atualizar os projetos com o orçamento e categoria reais
          return {
            ...project,
            budget: budget ? budget.name : 0, // Se encontrado, associa o orçamento; caso contrário, usa 0
            category: category ? category.name : 'Não definida', // Se encontrada, associa a categoria; caso contrário, usa "Não definida"
          };
        });

        // Atualiza o estado com os projetos
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
                category={project.category || ''} // Garantir que a categoria seja passada
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
