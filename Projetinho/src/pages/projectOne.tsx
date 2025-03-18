import styles from './projectOne.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../components/layout/container';

function ProjectOne() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);

  useEffect(() => {
    // Fetch project data
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

    // Fetch categories data
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

    // Fetch orcamentos data
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

  // Find the category and budget names based on the project data
  const projectCategory = categories.find(category => category.id === project?.categoryId);
  const projectBudget = orcamentos.find(orcamento => orcamento.id === project?.orcamento_id);

  if (!project) {
    return <div>Carregando projeto...</div>;
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.teste}>
          <Container>
            <div>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar projeto'}
              </button>
              {!showProjectForm ? (
                <div>
                  <p>
                    <span>Categoria:</span> {projectCategory?.name || 'Categoria desconhecida'}
                  </p>

                  <p>
                    <span>Total de Orçamento:</span> {projectBudget?.name || 'Orçamento não disponível'}
                  </p>
                </div>
              ) : (
                <div>
                  <p>detalhes do projeto</p>
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <div>Projeto não encontrado</div>
      )}
    </>
  );
}

export default ProjectOne;
