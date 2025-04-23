import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './projectOne.module.css';
import { FaTags, FaMoneyBillAlt } from 'react-icons/fa';
import ProjectForm from '../components/projects/projectForm';

interface Project {
  id?: string;
  name: string;
  budget: number;
  categoryId?: string;
  orcamento_id?: string;
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
  const [error, setError] = useState<string | null>(null);
  const [services, setShowService] = useState(false);

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
        setError('Ocorreu um erro ao carregar as informações do projeto.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const saveProject = async (updatedProject: Project) => {
    try {
      const response = await fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) throw new Error('Erro ao salvar o projeto');

      const data = await response.json();
      setProject(data);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    }
  };

  if (loading) return <div className={styles.loadingMessage}>Carregando projeto...</div>;
  if (error) return <div className={styles.errorMessage}>{error}</div>;

  return (
    <div className={styles.projectContainer}>
      <h1 className={styles.projectTitle}>{project?.name}</h1>
  
      <button className={styles.editButton} onClick={() => setShowForm(prev => !prev)}>
        {showForm ? 'Cancelar' : 'Editar Projeto'}
      </button>
  
      {showForm ? (
        <div className={styles.projectFormContainer}>
          <ProjectForm
            handleSubmit={saveProject}
            projectData={project!}
            btnText="Salvar Alterações"
          />
        </div>
      ) : (
        <div className={styles.projectDescription}>
          <div className={styles.categoria}>
            <FaTags className={styles.icon} />
            <span>
              Categoria: {categories.find(cat => cat.id === project?.categoryId)?.name || 'N/A'}
            </span>
          </div>
  
          <div className={styles.orcamento}>
            <FaMoneyBillAlt className={styles.icon} />
            <span>
              Orçamento: {orcamentos.find(o => o.id === project?.orcamento_id)?.name || 'N/A'}
            </span>
          </div>
        </div>
      )}
      <div className= {styles.serviceForm}>
        <h2>Adicione um serviço</h2>
        <button className={styles.editButton} onClick={() => toggleServiceForm(prev => !prev)}>
        {showForm ? 'Fechar' : 'Adicionar serviço'}
      </button>
      <div className= {styles.projectInfo}>
        {showServiceForm && <div>Formulário do serviço<div/>
        </>}
      </div>
      </div>
    </div>
    
  );
  
}

export default ProjectOne;
