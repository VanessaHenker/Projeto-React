import styles from './projectOne.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../components/layout/container';

function ProjectOne() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [loading, setLoading] = useState(true); // Flag para carregar
  const [error, setError] = useState<string | null>(null); // Armazenar erros

  useEffect(() => {
    if (id) {
      setLoading(true); // Inicia o carregamento ao fazer a requisição
      setError(null); // Limpa qualquer erro anterior

      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('Erro ao buscar o projeto');
          }
          return resp.json();
        })
        .then((data) => {
          setProject(data);
          setLoading(false); // Finaliza o carregamento
        })
        .catch((error) => {
          setError(error.message); // Armazena o erro
          setLoading(false);
        });
    }
  }, [id]);

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  if (loading) {
    return <div>Carregando projeto...</div>; // Mensagem de carregamento
  }

  if (error) {
    return <div>Erro: {error}</div>; // Exibe erro, se houver
  }

  if (!project) {
    return <div>Projeto não encontrado.</div>; // Caso não encontre o projeto
  }

  return (
    <>
      <Container>
        <div className={styles.teste}>
          <h1>Projeto: {project.name}</h1>
          <button onClick={toggleProjectForm}>
            {!showProjectForm ? 'Editar projeto' : 'Fechar projeto'}
          </button>

          {!showProjectForm ? (
            <div>
              <p>
                <span>Categoria:</span> {project.category.name}
              </p>
              <p>
                <span>Total de Orçamento:</span> {project.budget}
              </p>
            </div>
          ) : (
            <div>
              <p>Detalhes para editar o projeto</p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default ProjectOne;
