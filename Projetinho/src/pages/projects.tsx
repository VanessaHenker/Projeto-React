import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './projects.module.css';

import Container from '../components/layout/container';
import LinkButton from '../components/layout/linkButton';
import ProjectCard from '../components/projects/projectCard';

interface Project {
  id: string;
  name: string;
  budget: string;
  category: string;
  orcamento_id: string;
}

interface Category {
  id: string;
  name: string;
}

interface Orcamento {
  id: string;
  name: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || '';

  // Carrega categorias e orçamentos
  useEffect(() => {
    if (message) {
      navigate('.', { replace: true });
    }

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

    fetchCategoriesAndOrcamentos();
  }, [message, navigate]);

  // Carrega projetos e associa orçamentos corretamente
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
          const updatedProjects = data.map((project) => {
            const category = categories.find((cat) => cat.id === project.categoryId);
            const orcamento = orcamentos.find((orc) => orc.id === project.orcamento_id);

            const budget = orcamento ? orcamento.name : 'R$ 0,00';

            return {
              id: project.id,
              name: project.name,
              orcamento_id: project.orcamento_id, 
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

      <div className={styles.projectsCreate}>
        <Container>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category}
              orcamento_id={project.orcamento_id} // Passando orcamento_id
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
