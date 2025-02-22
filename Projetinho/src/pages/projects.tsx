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
  budget: string;  // Alterado para string, já que o orçamento é um formato de string (ex: "R$ 1.500,00")
  category: string;
}

interface Category {
  id: number;
  name: string;
}

interface Orcamento {
  id: number;
  name: string;  // O nome do orçamento será a string, ex: "R$ 1.500,00"
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || '';

  useEffect(() => {
    if (message) {
      navigate('.', { replace: true });
    }

    // Fetch categories and budgets (orcamentos)
    Promise.all([
      fetch('http://localhost:5000/categories').then((res) => res.json()),
      fetch('http://localhost:5000/orcamentos').then((res) => res.json()),
    ])
      .then(([categoriesData, orcamentosData]) => {
        setCategories(categoriesData);
        setOrcamentos(orcamentosData);
      })
      .catch((err) => {
        console.error('Erro ao buscar categorias ou orçamentos', err);
      });

    // Fetch projects
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
        // Mapeamento de projetos para incluir nome da categoria e orçamento
        const updatedProjects = data.map((project) => {
          // Encontrar a categoria
          const category = categories.find((cat) => cat.id === project.categoryId);
          // Encontrar o orçamento
          const orcamento = orcamentos.find((orc) => orc.id === project.orcamento_id);

          return {
            id: project.id,
            name: project.name,
            budget: orcamento?.name || 'R$ 0,00',  // Usar o nome do orçamento
            category: category?.name || 'Categoria Desconhecida',
          };
        });
        setProjects(updatedProjects);
      })
      .catch((err) => {
        console.error('Erro na requisição:', err);
      });
  }, [message, navigate, categories, orcamentos]);

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus Projetos</h1>
        <LinkButton text="Criar Projeto" to="/criar-projeto" />
      </div>

      {message && <Message type="success" msg={message} />}

      <div className={styles.projectsCreate}>
        <Container>
          {/* Exibe os projetos com todas as informações corretas de categoria e orçamento */}
          {projects.map((project) => (
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
          ))}
        </Container>
      </div>
    </div>
  );
}

export default Projects;
