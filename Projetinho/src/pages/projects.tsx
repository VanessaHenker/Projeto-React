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
  budget: string; // Agora orçamento é string para garantir a exibição correta
  category: string;
}

interface Category {
  id: string;
  name: string;
}

interface Orcamento {
  id: string;
  name: string; // Orçamento é uma string com o formato "R$ 1.500,00"
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

            // Garantindo que o orçamento seja tratado como string (no formato "R$ 0,00")
            const budget = orcamento ? orcamento.name : 'R$ 0,00';

            return {
              id: project.id,
              name: project.name,
              budget: budget, // Orçamento como string
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

  // Função para criar novo projeto (com orçamento selecionado)
  const createProject = async (name: string, categoryId: string, orcamentoId: string) => {
    try {
      const response = await fetch('http://localhost:5000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          categoryId,
          orcamento_id: orcamentoId, // Passando o orcamento_id corretamente
        }),
      });
      const result = await response.json();
      console.log('Projeto criado:', result);
      setProjects((prev) => [...prev, result]); // Adiciona o novo projeto na lista
    } catch (error) {
      console.error('Erro ao criar o projeto:', error);
    }
  };

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
              budget={project.budget} // Passando o orçamento como string
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
