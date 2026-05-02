import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./projects.module.css";
import Container from "../components/layout/container";
import Loading from "../components/layout/loading";
import LinkButton from "../components/layout/linkButton";
import ProjectCard from "../components/projects/projectCard";
import Message from "../components/layout/message";  // Importando o componente Message

interface Project {
  id: string;
  name: string;
  budget: string;
  categoryId: string;
  category?: string;
  orcamento_id: string;
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
  const [projectMessage, setProjectMessage] = useState<string>(''); // Corrigir nome da variável de estado
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "";

  // Função para buscar categorias e orçamentos
  const fetchCategoriesAndOrcamentos = async () => {
    try {
      const [categoriesData, orcamentosData] = await Promise.all([
        fetch("http://localhost:5000/categories").then((res) => res.json()),
        fetch("http://localhost:5000/orcamentos").then((res) => res.json()),
      ]);
      setCategories(categoriesData);
      setOrcamentos(orcamentosData);
    } catch (err) {
      console.error("Erro ao buscar categorias ou orçamentos", err);
      setError("Falha ao carregar categorias ou orçamentos. Tente novamente.");
    }
  };

  useEffect(() => {
    if (message) {
      navigate(".", { replace: true });
    }

    fetchCategoriesAndOrcamentos();
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
          budget: orcamento ? orcamento.name : "R$ 0,00",
        };
      });
      setProjects(updatedProjects);
    } catch (err) {
      console.error("Erro na requisição dos projetos:", err);
      setError("Falha ao carregar projetos. Tente novamente.");
    }
  };
  

  const handleRemove = async (id: string) => {
    try {
      setRemoveLoading(true);
      await fetch(`http://localhost:5000/projects/${id}`, { method: "DELETE" });
      setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
      setRemoveLoading(false);
      setProjectMessage('Projeto removido com sucesso!'); // Mensagem de sucesso
    } catch (error) {
      setRemoveLoading(false);
      setProjectMessage('Erro ao remover projeto!'); // Mensagem de erro
    }
  };

  // Função para atualizar o orçamento de um projeto
  const updateProjectBudget = (projectId: string, newBudgetId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          const orcamento = orcamentos.find((o) => o.id === newBudgetId);
          return {
            ...project,
            orcamento_id: newBudgetId,
            budget: orcamento ? orcamento.name : "R$ 0,00",
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