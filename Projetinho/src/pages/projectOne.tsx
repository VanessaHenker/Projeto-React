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
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceAdded, setServiceAdded] = useState(false);
  const [serviceError, setServiceError] = useState<string | null>(null);

  const toggleProjectForm = () => setShowProjectForm(prev => !prev);
  const toggleServiceForm = () => setShowServiceForm(prev => !prev);

  const handleServiceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceName(event.target.value);
  };

  const handleServiceDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setServiceDescription(event.target.value);
  };

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

        if (!projectData || !categoriesData || !orcamentosData) {
          throw new Error('Dados inválidos recebidos');
        }

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

  const projectCategory = categories.find(category => category.id === project?.categoryId);
  const projectBudget = orcamentos.find(orcamento => orcamento.id === project?.orcamento_id);

  const totalUtilizado = projectBudget?.used ? `R$ ${projectBudget.used.toFixed(2)}` : 'R$ 0,00';

  const editPost = (updatedProject: Project) => {
    fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setProject(data);
          setShowProjectForm(false);
        } else {
          console.error('Erro ao editar projeto: Dados inválidos');
        }
      })
      .catch(error => console.error('Erro ao editar o projeto:', error));
  };

  const addService = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!serviceName || !serviceDescription) {
      setServiceError('Todos os campos são obrigatórios');
      return;
    }

    const serviceData = { name: serviceName, description: serviceDescription };

    try {
      const response = await fetch('http://localhost:5000/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });
      const data = await response.json();
      if (response.ok && data) {
        setServiceAdded(true);
        setServiceName('');
        setServiceDescription('');
        setServiceError(null);
      } else {
        throw new Error('Erro ao adicionar serviço');
      }
    } catch (error) {
      setServiceError('Erro ao adicionar serviço');
      console.error('Erro ao adicionar serviço:', error);
    }
  };

  if (loading) {
    return <div className={styles.loadingMessage}>Carregando projeto...</div>;
  }

  if (!project) {
    return <div className={styles.loadingMessage}>Projeto não encontrado</div>;
  }

  return (
    <div className={styles.projectContainer}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>

      <Container>
        <div className={styles.mainContent}>
          <h1 className={styles.projectTitle}>Projeto: {project.name}</h1>

          <button onClick={toggleProjectForm}>
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
                <span>Total Utilizado:</span> {totalUtilizado}
              </p>
            </div>
          ) : (
            <div className={styles.projectInfo}>
              <ProjectForm
                handleSubmit={editPost}
                btn="Concluir edição"
                projectData={project}
              />
            </div>
          )}
        </div>

        <div className={styles.serviceFormContainer}>
          <h2>Adicione um serviço:</h2>
          <button onClick={toggleServiceForm}>
            {showServiceForm ? 'Cancelar' : 'Adicionar serviço'}
          </button>

          {showServiceForm && (
            <form onSubmit={addService}>
              <label>Nome do serviço:</label>
              <input
                type="text"
                name="serviceName"
                value={serviceName}
                onChange={handleServiceNameChange}
                required
              />
              <label>Descrição:</label>
              <textarea
                name="serviceDescription"
                value={serviceDescription}
                onChange={handleServiceDescriptionChange}
                required
              />
              <button type="submit">Adicionar serviço</button>
            </form>
          )}

          {serviceError && <p className={styles.errorMessage}>{serviceError}</p>}
          {serviceAdded && <p className={styles.successMessage}>Serviço adicionado com sucesso!</p>}
          <Container customClass='start'>
            <p>Itens de serviço:</p>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default ProjectOne;
