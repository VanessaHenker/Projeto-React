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
  categoryId: string; // Adicionando categoriaId
  orcamento_id: string; // Adicionando orcamento_id
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
  }, [message, navigate]);

  useEffect(() => {
    if (categories.length === 0 || orcamentos.length === 0) return;

    // Fetch projects after categories and orcamentos are ready
    fetch('http://localhost:5000/projects')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar projetos');
        }
        return response.json();
      })
      .then((data: any[]) => {
        const updatedProjects = data.map((project) => {
          const category = categories.find((cat) => cat.id === project.category_id);
          const orcamento = orcamentos.find((orc) => orc.id === project.orcamento_id);

          // Converter orçamento para número
          const budget = orcamento?.name
            ? parseFloat(
                orcamento.name
                  .replace('R$ ', '')
                  .replace('.', '') // Remover pontos de milhar
                  .replace(',', '.') // Substituir vírgula por ponto
              )
            : 0;

          return {
            id: project.id,
            name: project.name,
            budget: budget,
            category: category?.name || 'Categoria Desconhecida',
            categoryId: project.category_id, // Adicionando categoryId
            orcamento_id: project.orcamento_id, // Adicionando orcamento_id
          };
        });
        setProjects(updatedProjects);
      })
      .catch((err) => {
        console.error('Erro na requisição:', err);
      });
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
