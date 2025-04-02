import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './projectOne.module.css';
import Container from '../components/layout/container';
import { FaTags, FaMoneyBillAlt, FaClipboardList } from 'react-icons/fa';
import ProjectForm from '../components/projects/projectForm';

interface Project {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  orcamento_id: number;
}

interface Category {
  id: number;
  name: string;
}

interface Orcamento {
  id: number;
  name: string;
  used: number;
}

function ProjectOne() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const [projectRes, categoriesRes, orcamentosRes] = await Promise.all([
        fetch(`http://localhost:5000/projects/${id}`),
        fetch('http://localhost:5000/categories'),
        fetch('http://localhost:5000/orcamentos')
      ]);

      if (!projectRes.ok || !categoriesRes.ok || !orcamentosRes.ok) {
        throw new Error('Erro ao carregar dados');
      }

      const projectData = await projectRes.json();
      const categoriesData = await categoriesRes.json();
      const orcamentosData = await orcamentosRes.json();

      setProject(projectData);
      setCategories(categoriesData);
      setOrcamentos(orcamentosData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const editPost = async (updatedProject: Project) => {
    try {
      const response = await fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar o projeto');
      }

      const data = await response.json();
      console.log('Projeto atualizado:', data);
      setProject(data);
      setShowProjectForm(false);
    } catch (error) {
      console.error('Erro ao editar o projeto:', error);
    }
  };

  if (loading) {
    return <div className={styles.loadingMessage}>Carregando projeto...</div>;
  }

  if (!project) {
    return <div className={styles.loadingMessage}>Projeto não encontrado</div>;
  }

  const projectCategory = categories.find(category => category.id === project?.categoryId);
  const projectBudget = orcamentos.find(orcamento => orcamento.id === project?.orcamento_id);

  return (
    <div className={styles.projectContainer}>
      <Container>
        <div className={styles.mainContent}>
          <h1 className={styles.projectTitle}>Projeto: {project.name}</h1>

          <button onClick={() => setShowProjectForm(prev => !prev)}>
            {showProjectForm ? 'Cancelar edição' : 'Editar projeto'}
          </button>

          {!showProjectForm ? (
            <div>
              <p className={styles.projectDescription}>
                <FaTags className={styles.icon} />
                <span>Categoria:</span> {projectCategory?.name || 'Categoria desconhecida'}
              </p>
              <p className={styles.projectDescription}>
                <FaMoneyBillAlt className={styles.icon} />
                <span>Total de Orçamento:</span> {projectBudget?.name || 'Orçamento não disponível'}
              </p>
              <p className={styles.projectDescription}>
                <FaClipboardList className={styles.icon} />
                <span>Total Utilizado:</span> R$ {projectBudget?.used.toFixed(2) || '0,00'}
              </p>
            </div>
          ) : (
            <ProjectForm handleSubmit={editPost} btn="Concluir edição" projectData={project} />
          )}
        </div>
      </Container>
    </div>
  );
}

export default ProjectOne;
