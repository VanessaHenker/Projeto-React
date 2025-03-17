import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './projectOne.module.css';
import Loading from '../components/layout/loading';
import Container from '../components/layout/container';

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
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar o projeto, categorias e orçamentos
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/projects/${id}`)
      .then((res) => res.ok ? res.json() : Promise.reject('Erro ao buscar o projeto'))
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
        setError(err as string);
        setLoading(false);
      });
  }, [id]);

  const getCategoryName = (categoryId: string) => categories.find((cat) => cat.id === categoryId)?.name || 'Categoria desconhecida';
  const getOrcamentoName = (orcamentoId: string) => orcamentos.find((orc) => orc.id === orcamentoId)?.name || 'Orçamento desconhecido';

  // Alternar a exibição do formulário
  const toggleProjectForm = () => {
    setShowForm((prev) => !prev);
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!project) return <div>Projeto não encontrado.</div>;

  return (
    <Container customClass="column">
      <h1>Projeto: {project.name}</h1>
      <button onClick={toggleProjectForm}>
        {!showForm ? 'Editar projeto' : 'Fechar'}
      </button>

      {!showForm ? (
        <div className= {styles.projectContainer}>
          <p><strong>Categoria:</strong> {getCategoryName(project.categoryId)}</p>
          <p><strong>Orçamento:</strong> {getOrcamentoName(project.orcamento_id)}</p>
        </div>
      ) : (
        <form>
          <label>
            Nome do Projeto:
            <input
              type="text"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
          </label>
          <label>
            Categoria:
            <select
              value={project.categoryId}
              onChange={(e) => setProject({ ...project, categoryId: e.target.value })}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Orçamento:
            <select
              value={project.orcamento_id}
              onChange={(e) => setProject({ ...project, orcamento_id: e.target.value })}
            >
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
    </Container>
  );
}

export default ProjectOne;
