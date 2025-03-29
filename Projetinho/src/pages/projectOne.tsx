import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./projectOne.module.css";
import Container from "../components/layout/container";
import { FaTags, FaMoneyBillAlt, FaClipboardList } from "react-icons/fa";
import ProjectForm from "../components/projects/projectForm";

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
  const [editSuccess, setEditSuccess] = useState(false);

  const toggleProjectForm = () => setShowProjectForm((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, categoriesRes, orcamentosRes] = await Promise.all([
          fetch(`http://localhost:5000/projects/${id}`),
          fetch("http://localhost:5000/categories"),
          fetch("http://localhost:5000/orcamentos"),
        ]);

        if (!projectRes.ok || !categoriesRes.ok || !orcamentosRes.ok) {
          throw new Error("Erro ao carregar dados");
        }

        const projectData = await projectRes.json();
        const categoriesData = await categoriesRes.json();
        const orcamentosData = await orcamentosRes.json();

        setProject(projectData);
        setCategories(categoriesData);
        setOrcamentos(orcamentosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (updatedProject: Project) => {
    try {
      const response = await fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });

      const data = await response.json();

      if (response.ok) {
        setProject(data);
        setEditSuccess(true);
        setShowProjectForm(false);
      } else {
        console.error("Erro ao editar projeto");
        setEditSuccess(false);
      }
    } catch (error) {
      console.error("Erro ao editar projeto:", error);
      setEditSuccess(false);
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
      <Container>
        <h1>Projeto: {project.name}</h1>
        <button onClick={toggleProjectForm}>
          {showProjectForm ? "Cancelar edição" : "Editar projeto"}
        </button>

        {!showProjectForm ? (
          <div>
            <p>Categoria: {categories.find((c) => c.id === String(project.categoryId))?.name}</p>
            <p>Orçamento: {orcamentos.find((o) => o.id === project.orcamento_id)?.name}</p>
          </div>
        ) : (
          <ProjectForm
            handleSubmit={handleSubmit}
            btn="Concluir edição"
            projectData={project}
          />
        )}

        {editSuccess && !showProjectForm && <div>Projeto atualizado com sucesso!</div>}
      </Container>
    </div>
  );
}

export default ProjectOne;
