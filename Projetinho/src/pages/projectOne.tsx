import styles from './projectOne.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../components/layout/container';
import { FaTags, FaMoneyBillAlt, FaClipboardList } from 'react-icons/fa';
import ProjectForm from '../components/projects/projectForm';
import { Project } from '../types';  

function ProjectOne() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false); // Controle de exibição do formulário
  const [categories, setCategories] = useState<any[]>([]);
  const [orcamentos, setOrcamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setLoading(false); // Termina o carregamento após buscar o projeto
        })
        .catch((error) => {
          console.error('Erro ao buscar o projeto:', error);
          setError('Erro ao carregar o projeto. Tente novamente mais tarde.');
          setLoading(false); // Termina o carregamento em caso de erro
        });
    }

    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar categorias:', error);
        setError('Erro ao carregar categorias. Tente novamente mais tarde.');
      });

    fetch('http://localhost:5000/orcamentos', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOrcamentos(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar orçamentos:', error);
        setError('Erro ao carregar orçamentos. Tente novamente mais tarde.');
      });
  }, [id]);

  if (loading) {
    return <div className={styles.loadingMessage}>Carregando dados...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  const projectCategory = categories.find((category) => category.id === project?.categoryId);
  const projectBudget = orcamentos.find((orcamento) => orcamento.id === project?.orcamento_id);

  const totalUtilizado = projectBudget?.used ? projectBudget.used : 'R$ 0,00';

  function editPost(project: Project) {
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false); // Fecha o formulário após editar
      })
      .catch((error) => console.error('Erro ao editar o projeto:', error));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm); // Alterna a exibição do formulário
  }

  return (
    <>
      {project.name ? (
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
                {!showProjectForm ? 'Editar projeto' : 'Fechar projeto'}
              </button>

              {!showProjectForm ? (
                <div>
                  <p className={styles.projectDescription}>
                    <FaTags className={styles.icon} />
                    <span>Categoria:</span> {projectCategory ? projectCategory.name : 'Categoria não atribuída'}
                  </p>
                  <p className={styles.projectDescription}>
                    <FaMoneyBillAlt className={styles.icon} />
                    <span>Total de Orçamento:</span> {projectBudget ? projectBudget.name : 'Orçamento não atribuído'}
                  </p>
                  <p className={styles.projectDescription}>
                    <FaClipboardList className={styles.icon} />
                    <span>Total Utilizado:</span> {totalUtilizado}
                  </p>
                </div>
              ) : (
                <div className={styles.projectInfo}>
                  <div className={showProjectForm ? styles.form : styles.otherComponent}>
                    <ProjectForm handleSubmit={editPost} btn="Concluir edição" projectData={project} />
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <div className={styles.loadingMessage}>Projeto não encontrado</div>
      )}
    </>
  );
}

export default ProjectOne;
