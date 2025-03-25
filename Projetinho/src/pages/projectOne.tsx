import styles from './projectOne.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../components/layout/container';
import { FaTags, FaMoneyBillAlt, FaClipboardList } from 'react-icons/fa';
import ProjectForm from '../components/projects/projectForm';
import { Project } from '../types';  // Certifique-se de importar o tipo Project corretamente

function ProjectOne() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [orcamentos, setOrcamentos] = useState<any[]>([]);

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
        })
        .catch((error) => console.error('Erro ao buscar o projeto:', error));
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
      .catch((error) => console.error('Erro ao buscar categorias:', error));

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
      .catch((error) => console.error('Erro ao buscar orçamentos:', error));
  }, [id]);

  const projectCategory = categories.find((category) => category.id === project?.categoryId);
  const projectBudget = orcamentos.find((orcamento) => orcamento.id === project?.orcamento_id);

  if (!project) {
    return <div className={styles.loadingMessage}>Carregando projeto...</div>;
  }

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
        setShowProjectForm(false);
      })
      .catch((error) => console.error('Erro ao editar o projeto:', error));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
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
      isForm={showProjectForm}  // Passando a prop isForm
    />
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
