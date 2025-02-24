import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from '../pages/projects.module.css';

import Message from '../components/layout/message';
import Container from '../components/layout/container';
import LinkButton from '../components/layout/linkButton';
import ProjectCard from '../components/projects/projectCard';

interface Project {
  id: string;
  name: string;
  budget: number;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

interface Orcamento {
  id: string;
  name: number;
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
    const fetchCategoriesAndOrcamentos = async () => {
      try {
        const [categoriesData, orcamentosData] = await Promise.all([
          fetch('http://localhost:5000/categories').then((res) => res.json()),
          fetch('http://localhost:5000/orcamentos').then((res) => res.json()),
        ]);
        setCategories(categoriesData);
        setOrcamentos(orcamentosData);
      } catch (err) {
        console.error('Erro ao buscar categorias ou orçamentos', err);
      }
    };

    // Fetch categories and orcamentos first
    fetchCategoriesAndOrcamentos();
  }, [message, navigate]);

  // Fetch projects after categories and orcamentos are loaded
  useEffect(() => {
    if (categories.length > 0 && orcamentos.length > 0) {
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
            const category = categories.find((cat) => cat.id === project.categoryId);
            const orcamento = orcamentos.find((orc) => orc.id === project.orcamento_id);

            const budget = orcamento?.name || 0; // Aqui, orcamento é número, então não precisa de conversão

            return {
              id: project.id,
              name: project.name,
              budget: budget,
              category: category?.name || 'Categoria Desconhecida',
            };
          });
          setProjects(updatedProjects);
        })
        .catch((err) => {
          console.error('Erro na requisição dos projetos:', err);
        });
    }
  }, [categories, orcamentos]); 

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus Projetos</h1>
        <LinkButton text="Criar Projeto" to="/criar-projeto" />
      </div>

      {message && <Message type="success" msg={message} />}

      <div className={styles.projectsCreate}>
        <Container>
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
