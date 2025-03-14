import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './projectOne.module.css';
import Loading from '../components/layout/loading';

interface Category {
  id: string;
  name: string;
}

interface Orcamento {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  categoryId: string;
  orcamento_id: string;
}

interface Data {
  projects: Project[];
  categories: Category[];
  orcamentos: Orcamento[];
}

function ProjectOne() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      setProject(null);
      setCategories([]);
      setOrcamentos([]);

      fetch(`http://localhost:5000/projects/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Erro ao buscar o projeto');
          }
          return res.json();
        })
        .then((data: Data) => {
          const projectData = data.projects.find((p) => p.id === id);
          if (projectData) {
            setProject(projectData);
            setCategories(data.categories);
            setOrcamentos(data.orcamentos);
          } else {
            setError('Projeto não encontrado');
          }
          setLoading(false);
        })
        .catch((err) => {
          setError('Erro ao buscar o projeto');
          setLoading(false);
          console.error('Erro ao buscar o projeto:', err);
        });
    }
  }, [id]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Categoria desconhecida';
  };

  const getOrcamentoName = (orcamentoId: string) => {
    const orcamento = orcamentos.find((orc) => orc.id === orcamentoId);
    return orcamento ? orcamento.name : 'Orçamento desconhecido';
  };

  // Verifica se o projeto está carregado ou se ocorreu erro
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Verifica se 'project' é null antes de acessar suas propriedades
  if (!project) {
    return <div>Projeto não encontrado</div>;
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <div className={styles.projectContainer}>
      <h1 className={styles.projectTitle}>{project.name}</h1>
      <button onClick={toggleProjectForm}>
        {!showProjectForm ? 'Editar projeto' : 'Fechar'}
      </button>

      {!showProjectForm ? (
        <div>
          <p>
            <span>Categoria:</span> {getCategoryName(project.categoryId)}
          </p>
          <p>
            <span>Orçamento:</span> {getOrcamentoName(project.orcamento_id)}
          </p>
        </div>
      ) : (
        <form>
          <label>
            Nome do Projeto:
            <input type="text" value={project.name} onChange={() => {  }} />
          </label>
          <label>
            Categoria:
            <select value={project.categoryId} onChange={() => {  }}>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Orçamento:
            <select value={project.orcamento_id} onChange={() => {
             }}>
              {orcamentos.map((orc) => (
                <option key={orc.id} value={orc.id}>
                  {orc.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Salvar</button>
        </form>
      )}
    </div>
  );
}

export default ProjectOne;
