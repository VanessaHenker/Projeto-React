import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './projectOne.module.css';
import Container from '../components/layout/container';
import { FaTags, FaMoneyBillAlt } from 'react-icons/fa';
import ProjectForm from '../components/projects/projectForm';

interface Project {
  id?: string;
  name: string;
  budget: number;
  categoryId?: string;
  orcamento_id?: string; // agora incluído
}

interface Category {
  id: string;
  name: string;
}

interface Orcamento {
  id: string;
  name: string;
}

function ProjectOne() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isNewProject, setIsNewProject] = useState(false);

  useEffect(() => {
    if (!id) return;

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

        setProject({
          ...projectData,
          id: String(projectData.id),
          budget: Number(projectData.budget)
        });
        setCategories(categoriesData);
        setOrcamentos(orcamentosData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const saveProject = async (updatedProject: Project) => {
    try {
      const url = isNewProject
        ? 'http://localhost:5000/projects'
        : `http://localhost:5000/projects/${updatedProject.id}`;

      const method = isNewProject ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) throw new Error('Erro ao salvar o projeto');

      const data = await response.json();
      setProject(data);
      setShowForm(false);
      setIsNewProject(false);
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    }
  };

  if (loading) return <div className={styles.loadingMessage}>Carregando projeto...</div>;

  return (
    <div className={styles.projectContainer}>
      <Container>
        <h1 className={styles.projectTitle}>
          {isNewProject ? 'Criar Novo Projeto' : `Projeto: ${project?.name}`}
        </h1>

        <button onClick={() => { setIsNewProject(false); setShowForm(prev => !prev); }}>
          {showForm ? 'Cancelar' : 'Editar Projeto'}
        </button>

        <button onClick={() => { setIsNewProject(true); setShowForm(true); setProject(null); }}>
          Criar Novo Projeto
        </button>

        {showForm ? (
          <ProjectForm
            handleSubmit={saveProject}
            projectData={!isNewProject && project ? project : undefined}
            btnText={isNewProject ? 'Criar Projeto' : 'Salvar Alterações'}
          />
        ) : (
          project && (
            <div>
              <p>
                <FaTags /> Categoria:{' '}
                {categories.find(cat => cat.id === project.categoryId)?.name || 'N/A'}
              </p>
              <p>
                <FaMoneyBillAlt /> Orçamento:{' '}
                {orcamentos.find(o => o.id === project.orcamento_id)?.name || 'N/A'}
              </p>
            </div>
          )
        )}
      </Container>
    </div>
  );
}

export default ProjectOne;
