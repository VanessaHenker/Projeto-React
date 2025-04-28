import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './projectOne.module.css';
import { FaTags, FaMoneyBillAlt } from 'react-icons/fa';
import ProjectForm from '../components/projects/projectForm';
import ServiceForm from '../components/services/serviceForm';
import Container from '../components/layout/container';
import ServiceCard from '../components/services/serviceCard';

interface Project {
  id?: string;
  name: string;
  budget: number;
  categoryId?: string;
  orcamento_id?: string;
  services?: Service[];
}

interface Service {
  id: string;
  name: string;
  cost: string;
  description: string;
  category: string;
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
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [projectRes, categoriesRes, orcamentosRes] = await Promise.all([
          fetch(`http://localhost:5000/projects/${id}`),
          fetch('http://localhost:5000/categories'),
          fetch('http://localhost:5000/orcamentos'),
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
          budget: Number(projectData.budget),
          services: projectData.services || [],
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
      setProject({
        ...data,
        services: data.services || [],
      });
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    }
  };

  const createService = async (newService: Service) => {
    if (!project) return;

    const updatedServices = [...(project.services || []), { ...newService, id: crypto.randomUUID() }];
    const updatedProject = { ...project, services: updatedServices };

    setProject(updatedProject);
    setShowServiceForm(false);
    setServiceToEdit(null);

    await saveProject(updatedProject);
  };

  const updateService = async (updatedService: Service) => {
    if (!project) return;

    const updatedServices = project.services?.map(service =>
      service.id === updatedService.id ? updatedService : service
    );

    const updatedProject = { ...project, services: updatedServices };

    setProject(updatedProject);
    setShowServiceForm(false);
    setServiceToEdit(null);

    await saveProject(updatedProject);
  };

  const deleteService = async (serviceId: string) => {
    if (!project) return;

    const updatedServices = project.services?.filter(service => service.id !== serviceId);
    const updatedProject = { ...project, services: updatedServices };

    setProject(updatedProject);

    await saveProject(updatedProject);
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

      <div className={styles.serviceForm}>
        <h2>{serviceToEdit ? 'Editar Serviço' : 'Adicione um serviço'}</h2>

        <button
          className={styles.editButton}
          onClick={() => {
            setShowServiceForm(prev => {
              if (prev) setServiceToEdit(null);
              return !prev;
            });
          }}
        >
          {showServiceForm ? 'Fechar' : serviceToEdit ? 'Cancelar Edição' : 'Adicionar serviço'}
        </button>

        {showServiceForm && (
          <div className={styles.projectInfo}>
            <ServiceForm
              handleSubmit={serviceToEdit ? updateService : createService}
              btnText={serviceToEdit ? 'Salvar Alterações' : 'Adicionar Serviço'}
              service={serviceToEdit || { id: '', name: '', cost: '', description: '', category: '' }}
            />
          </div>
        )}
      </div>

      <h2>Serviços</h2>

      <Container customClass="start">
        {project?.services && project.services.length > 0 ? (
          <ul>
            {project.services.map(service => (
              <div key={service.id}>
                <ServiceCard
                  id={service.id}
                  name={service.name}
                  cost={service.cost}
                  description={service.description}
                  handleEdit={() => {
                    setServiceToEdit(service);
                    setShowServiceForm(true);
                  }}
                  handleRemove={() => deleteService(service.id)}
                />
              </div>
            ))}
          </ul>
        ) : (
          <p>Não há serviços cadastrados.</p>
        )}
      </Container>
    </div>
  );
}

export default ProjectOne;
