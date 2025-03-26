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
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [orcamentos, setOrcamentos] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
      })
        .then((resp) => resp.json())
        .then((data) => setProject(data))
        .catch((error) => console.error('Erro ao buscar o projeto:', error));
    }

    Promise.all([
      fetch('http://localhost:5000/categories', { method: 'GET', headers: { 'Content-type': 'application/json' } }),
      fetch('http://localhost:5000/orcamentos', { method: 'GET', headers: { 'Content-type': 'application/json' } })
    ])
      .then(([categoriesResp, orcamentosResp]) =>
        Promise.all([categoriesResp.json(), orcamentosResp.json()])
      )
      .then(([categoriesData, orcamentosData]) => {
        setCategories(categoriesData);
        setOrcamentos(orcamentosData);
      })
      .catch((error) => console.error('Erro ao buscar categorias e orçamentos:', error));
  }, [id]);

  const projectCategory = categories.find((category) => category.id === project?.categoryId);
  const projectBudget = orcamentos.find((orcamento) => orcamento.id === project?.orcamento_id);

  if (!project) {
    return <div className={styles.loadingMessage}>Carregando dados...</div>;
  }

  const totalUtilizado = projectBudget?.used ? projectBudget.used : 'R$ 0,00';

  function editPost(project: Project) {
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          setProject(data);
          setShowProjectForm(false);
        } else {
          console.error('Erro ao editar projeto: Dados inválidos');
        }
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
                {!showProjectForm ? 'Editar projeto' : 'Cancelar edição'}
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
                  <ProjectForm handleSubmit={editPost} btn="Concluir edição" projectData={project} />
                </div>
              )}
            </div>
          </Container>

          <div className={styles.serviceFormContainer}>
            <h2>Adicione um serviço</h2>
          </div>
        </div>
      ) : (
        <div className={styles.loadingMessage}>Projeto não encontrado</div>
      )}
    </>
  );
}

export default ProjectOne;
