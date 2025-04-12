import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../layout/loading";
import Container from "../layout/container";
import ProjectForm from "../project/projectForm";
import ProjectCard from "../project/projectCard";
import styles from "./projectOne.module.css";
import { url } from "../../utils/url";

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
  budget: number;
  categoryId?: string;
  orcamento_id: string;
}

function ProjectOne() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [orcamento, setOrcamento] = useState<Orcamento | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchProject() {
      try {
        const projectRes = await fetch(`${url}/projects/${id}`);
        const projectData: Project = await projectRes.json();
        setProject(projectData);

        if (projectData.categoryId) {
          const categoryRes = await fetch(`${url}/categories/${projectData.categoryId}`);
          const categoryData = await categoryRes.json();
          setCategory(categoryData);
        }

        if (projectData.orcamento_id) {
          const orcamentoRes = await fetch(`${url}/orcamentos/${projectData.orcamento_id}`);
          const orcamentoData = await orcamentoRes.json();
          setOrcamento(orcamentoData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do projeto:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  function toggleForm() {
    setShowForm((prev) => !prev);
  }

  function handleEdit(editedProject: Project) {
    setProject(editedProject);
    setShowForm(false);
  }

  return (
    <div className={styles.projectOneContainer}>
      {isLoading && <Loading />}
      {!isLoading && project && (
        <Container>
          {!showForm ? (
            <div className={styles.details}>
              <ProjectCard
                id={project.id}
                name={project.name}
                budget={project.budget}
                category={category?.name}
                orcamento={orcamento?.name}
              />
              <button className={styles.btn} onClick={toggleForm}>
                Editar Projeto
              </button>
            </div>
          ) : (
            <div className={styles.formEdit}>
              <h2>Editar Projeto</h2>
              <ProjectForm
                btnText="Salvar Alterações"
                handleSubmit={handleEdit}
                projectData={project}
              />
              <button className={styles.btn} onClick={toggleForm}>
                Cancelar
              </button>
            </div>
          )}
        </Container>
      )}
    </div>
  );
}

export default ProjectOne;
