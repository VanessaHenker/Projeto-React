import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa"; // Importando os ícones

import styles from "./projects.module.css";
import Container from "../components/layout/container";
import LinkButton from "../components/layout/linkButton";
import ProjectCard from "../components/projects/projectCard";

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
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "";

  useEffect(() => {
    if (message) {
      navigate(".", { replace: true });
    }

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
      }
    };

    fetchCategoriesAndOrcamentos();
  }, [message, navigate]);

  useEffect(() => {
    if (categories.length > 0 && orcamentos.length > 0) {
      fetch("http://localhost:5000/projects")
        .then((response) => response.json())
        .then((data: Project[]) => {
          const updatedProjects = data.map((project) => {
            const category = categories.find(
              (cat) => cat.id === project.categoryId
            );
            const orcamento = orcamentos.find(
              (orc) => orc.id === project.orcamento_id
            );
            return {
              ...project,
              category: category ? category.name : "Categoria Desconhecida",
              budget: orcamento ? orcamento.name : "R$ 0,00",
            };
          });
          console.log("Projetos carregados:", updatedProjects);
          setProjects(updatedProjects);
        })
        .catch((err) => console.error("Erro na requisição dos projetos:", err));
    }
  }, [categories, orcamentos]);

  const handleRemove = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/projects/${id}`, { method: "DELETE" });
      setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao remover projeto:", error);
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

        <LinkButton text="Criar Projeto" to="/criar-projeto">
          <FaPlus style={{ marginLeft: '10px' }} />
        </LinkButton>
      </div>

      <div className={styles.projectsCreate}>
        <Container>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              category={project.category ?? "Categoria Desconhecida"}
              orcamento_id={project.orcamento_id}
              handleRemove={handleRemove}
              updateBudget={updateProjectBudget}
            />
          ))}
        </Container>
      </div>
    </div>
  );
}

export default Projects;
