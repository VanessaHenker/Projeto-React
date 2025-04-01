import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../components/projects/projectForm";

const ProjectOne = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  interface Project {
    id: string;
    name: string;
    orcamento_id: string;
    categoryId: string;
    description?: string;
  }

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        const response = await fetch(`http://localhost:5000/projects/${id}`);

        if (!response.ok) {
          throw new Error("Erro ao buscar projeto");
        }

        const projectData = await response.json();
        setProject(projectData);
      } catch (err) {
        setError("Falha ao carregar projeto. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const editPost = async (formData: { name: string; orcamento_id: string; categoryId: string }) => {
    if (!id) return;

    try {
      const response = await fetch(`http://localhost:5000/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar o projeto");
      }

      navigate("/projects");
    } catch (error) {
      console.error("Erro ao editar o projeto:", error);
    }
  };

  if (loading) return <div>Carregando projeto...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Editar Projeto</h1>
      <ProjectForm handleSubmit={editPost} btn="Concluir edição" projectData={project} />
    </div>
  );
};

export default ProjectOne;
