import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../components/projects/projectForm";


const ProjectOne = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Aqui, estamos utilizando o 'navigate' para redirecionar

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:5000/projects/${id}`);
          const projectData = await response.json();
          setProject(projectData);
        }
      } catch (error) {
        console.error("Erro ao buscar projeto:", error);
      }
    };

    fetchProject();
  }, [id]);

  // Função para editar o projeto
  const editPost = async (formData: { name: string; orcamento_id: string; categoryId: string }) => {
    try {
      if (id) {
        const response = await fetch(`http://localhost:5000/projects/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          navigate("/projects"); // Redireciona para a página de projetos após edição
        } else {
          console.error("Erro ao editar o projeto");
        }
      }
    } catch (error) {
      console.error("Erro ao editar o projeto:", error);
    }
  };

  if (!project) {
    return <div>Carregando projeto...</div>;
  }

  return (
    <div>
      <h1>Editar Projeto</h1>
      <ProjectForm
        handleSubmit={editPost} // Passando a função handleSubmit corretamente
        btn="Concluir edição"  // Texto do botão
        projectData={project}  // Passando os dados do projeto para o formulário
      />
    </div>
  );
};

export default ProjectOne;
