import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './projectOne.module.css';
import Container from '../components/layout/container';

interface Category {
  id: number;
  name: string;
}

interface OrcamentoType {
  id: number;
  name: string;
  amount: number;
}

interface Project {
  name: string;
  category: Category;
  budget: number; 
}

function ProjectOne() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoType[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, orcamentosData] = await Promise.all([
          fetch("http://localhost:5000/categories").then((resp) => resp.json()),
          fetch("http://localhost:5000/orcamentos").then((resp) => resp.json()),
        ]);

        setCategories(categoriesData || []);
        setOrcamentos(orcamentosData || []);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true); 
  
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('Erro ao buscar o projeto');
          }
          return resp.json();
        })
        .then((data) => {
          setProject(data);
          setLoading(false); 
        })
        .catch((error) => {
          setError(error.message)
          setLoading(false);
        });
    }
  }, [id]);
  
  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  if (loading) {
    return <div>Carregando projeto...</div>; 
  }

  if (error) {
    return <div>Erro: {error}</div>; 
  }

  if (!project) {
    return <div>Projeto não encontrado.</div>; 
  }


  const projectCategory = categories.find((category) => category.id === project.category.id);


  const projectOrcamento = orcamentos.find((orcamento) => orcamento.id === project.budget);

  return (
    <Container>
      <div className={styles.teste}>
        <h1>Projeto: {project.name}</h1>
        <button onClick={toggleProjectForm}>
          {!showProjectForm ? 'Editar projeto' : 'Fechar projeto'}
        </button>

        {!showProjectForm ? (
          <div>
            <p>
              <span>Categoria:</span> {projectCategory ? projectCategory.name : 'Categoria não encontrada'}
            </p>
            <p>
              <span>Total de Orçamento:</span> {projectOrcamento ? projectOrcamento.amount : 'Orçamento não encontrado'}
            </p>
          </div>
        ) : (
          <div>
            <p>Detalhes para editar o projeto</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default ProjectOne;
