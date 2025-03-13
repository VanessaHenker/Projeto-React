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

  useEffect(() => {
    if (id) {
      // Simulação de chamada à API
      fetch(`http://localhost:5000/projects/${id}`)
        .then((res) => res.json())
        .then((data: Data) => {
          const projectData = data.projects.find((p) => p.id === id);
          setProject(projectData || null);
          setCategories(data.categories);
          setOrcamentos(data.orcamentos);
        })
        .catch((err) => console.error('Erro ao buscar o projeto:', err));
    }
  }, [id]);

  // Função para obter o nome da categoria com base no id
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Categoria desconhecida';
  };

  // Função para obter o nome do orçamento com base no id
  const getOrcamentoName = (orcamentoId: string) => {
    const orcamento = orcamentos.find((orc) => orc.id === orcamentoId);
    return orcamento ? orcamento.name : 'Orçamento desconhecido';
  };

  if (!project) {
    return <Loading />;
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
        <p>Detalhes do Projeto</p>
      )}
    </div>
  );
}

export default ProjectOne;
