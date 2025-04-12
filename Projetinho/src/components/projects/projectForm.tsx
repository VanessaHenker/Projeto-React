import styles from "./projectForm.module.css";
import Input from "../form/input";
import Select from "../form/select";
import Orcamento from "../form/orcamento";
import SubmitButton from "../form/submitButton";
import { useState, useEffect } from "react";
import { url } from "../../utils/url";

interface Project {
  id?: string;
  name: string;
  budget: number;
  categoryId?: string;
  orcamento_id?: string;
}

interface Category {
  id: string;
  name: string;
}

interface OrcamentoOption {
  id: string;
  name: string;
}

interface ProjectFormProps {
  handleSubmit: (project: Project) => void;
  btnText: string;
  projectData?: Project;
}

function ProjectForm({ handleSubmit, btnText, projectData }: ProjectFormProps) {
  const [project, setProject] = useState<Project>({
    id: projectData?.id,
    name: projectData?.name || "",
    budget: projectData?.budget || 0,
    categoryId: projectData?.categoryId || "",
    orcamento_id: projectData?.orcamento_id || "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [catResp, orcResp] = await Promise.all([
          fetch(`${url}/categories`, {
            headers: { "Content-Type": "application/json" },
          }),
          fetch(`${url}/orcamentos`, {
            headers: { "Content-Type": "application/json" },
          }),
        ]);
        const categoriesData = await catResp.json();
        const orcamentosData = await orcResp.json();
        setCategories(categoriesData);
        setOrcamentos(orcamentosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    loadData();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: name === "budget" ? Number(value) : value,
    }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    if (!project.orcamento_id) {
      alert("Preencha o campo de orçamento corretamente.");
      return;
    }
    const newProject: Project = {
      ...project,
      id: project.id || Math.random().toString(36).substr(2, 9),
    };
    setIsSubmitting(true);
    try {
      const response = await fetch(`${url}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      const data = await response.json();
      console.log("Projeto criado com sucesso:", data);
      handleSubmit(data);
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name}
      />
      <Orcamento
        text="Selecione um orçamento"
        name="orcamento_id"
        handleOnChange={handleChange}
        value={project.orcamento_id || ""}
        options={orcamentos.map((o) => ({ value: o.id, label: o.name }))}
        placeholder="Escolha um orçamento"
      />
      <Select
        text="Selecione uma categoria"
        name="categoryId"
        handleOnChange={handleChange}
        value={project.categoryId || ""}
        options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
      />
      <SubmitButton text={btnText || "Criar Projeto"} type="submit" />
    </form>
  );
}

export default ProjectForm;
