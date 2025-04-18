import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./projects.module.css";
import Container from "../components/layout/container";
import Loading from "../components/layout/loading";
import LinkButton from "../components/layout/linkButton";
import ProjectCard from "../components/projects/projectCard";
import Message from "../components/layout/message";

interface Project {
  id: string;
  name: string;
  budget: number;
  categoryId: string;
  category?: string;
  orcamento_id: string;
  orcamentoNome?: string;
}

interface Category {
  id: string;
  name: string;
}

interface Orcamento {
  id: string;
  name: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectMessage, setProjectMessage] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "";

  useEffect(() => {
    if (message) {
      setProjectMessage(message);
      setTimeout(() => setProjectMessage(""), 3000);
      navigate(".", { replace: true });
    }

    const fetchData = async () => {
      try {
        const [categoriesData, orcamentosData] = await Promise.all([
          fetch("http://localhost:5000/categories").then((res) => res.json()),
          fetch("http://localhost:5000/orcamentos").then((res) => res.json()),
        ]);
        setCategories(categoriesData);
        setOrcamentos(orcamentosData);
      } catch {
        setError("Falha ao carregar categorias ou orçamentos. Tente novamente.");
      }
    };

    fetchData();
  }, [message, navigate]);

  useEffect(() => {
    if (categories.length > 0 && orcamentos.length > 0) {
      fetchProjects();
    }
  }, [categories, orcamentos]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/projects");
      const data: Project[] = await response.json();

      const updatedProjects = data.map((project) => {
        const category = categories.find((cat) => cat.id === project.categoryId);
        const orcamento = orcamentos.find((orc) => orc.id === project.orcamento_id);
        return {
          ...project,
          category: category ? category.name : "Categoria Desconhecida",
          orcamentoNome: orcamento ? orcamento.name : "Orçamento Desconhecido",
        };
      });

      setProjects(updatedProjects);
    } catch {
      setError("Falha ao carregar projetos. Tente novamente.");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      setRemoveLoading(true);
      await fetch(`http://localhost:5000/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setProjectMessage("Projeto removido com sucesso!");
      setTimeout(() => setProjectMessage(""), 3000);
    } catch {
      setProjectMessage("Erro ao remover projeto!");
      setTimeout(() => setProjectMessage(""), 3000);
    } finally {
      setRemoveLoading(false);
    }
  };

  const updateProjectBudget = (projectId: string, newBudgetId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          const orcamento = orcamentos.find((o) => o.id === newBudgetId);
          return {
            ...project,
            orcamento_id: newBudgetId,
            orcamentoNome: orcamento ? orcamento.name : "Orçamento Desconhecido",
          };
        }
        return project;
      })
    );
  };

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.tittlesCenter}>
          <h1>Meus Projetos</h1>
          <h2>Transformando ideias em realidade, um projeto de cada vez!</h2>
        </div>
        <LinkButton text="Criar Projeto" to="/criar-projeto" />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <Message type="success" msg={projectMessage} />

      <div className={styles.projectsCreate}>
        <Container>
          {categories.length === 0 || orcamentos.length === 0 ? (
            <Loading />
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                category={project.category ?? "Categoria Desconhecida"}
                orcamento_id={project.orcamento_id}
                orcamentoNome={project.orcamentoNome}
                handleRemove={handleRemove}
                updateBudget={updateProjectBudget}
              />
            ))
          )}
          {removeLoading && <Loading />}
        </Container>
      </div>
    </div>
  );
}

export default Projects;
