// projectOne.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './projectOne.module.css';
import Container from '../components/layout/container';
import { FaTags, FaMoneyBillAlt} from 'react-icons/fa';
import ProjectForm from '../components/projects/projectForm';

interface Project {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  orcamento_id: string;
}

interface Category {
  id: string;
  name: string;
}

interface Orcamento {
  id: string;
  name: string;
  used?: number;
}

function ProjectOne() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
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

    if (id) {
      fetchData();
    }
  }, [id]);

  const editPost = (updatedProject: Project) => {
    fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    })
      .then(response => response.json())
      .then(data => {
        setProject(data);
        setShowProjectForm(false);
      })
      .catch(error => console.error('Erro ao editar o projeto:', error));
  };

  if (loading) return <div className={styles.loadingMessage}>Carregando projeto...</div>;
  if (!project) return <div className={styles.loadingMessage}>Projeto não encontrado</div>;

  return (
    <div className={styles.projectContainer}>
      <Container>
        <h1 className={styles.projectTitle}>Projeto: {project.name}</h1>
        <button onClick={() => setShowProjectForm(prev => !prev)}>
          {showProjectForm ? 'Cancelar edição' : 'Editar projeto'}
        </button>
        {showProjectForm ? (
          <ProjectForm handleSubmit={editPost} projectData={project} btn='Concluir edição' />
        ) : (
          <div>
            <p><FaTags /> Categoria: {categories.find(cat => cat.id === project.categoryId)?.name || 'N/A'}</p>
            <p><FaMoneyBillAlt /> Orçamento: {orcamentos.find(orc => orc.id === project.orcamento_id)?.name || 'N/A'}</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ProjectOne;