import React, { useState, useEffect } from "react";
import Input from "../form/input";
import Select from "../form/select";
import Orcamento from "../form/orcamento";
import styles from "./projectForm.module.css";

interface Category {
  id: string;
  name: string;
}

interface OrcamentoType {
  id: string;
  name: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  orcamento_id: number;
}

interface ProjectFormProps {
  handleSubmit: (updatedProject: Project) => void;
  btn: string;
  projectData: Project;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ handleSubmit, btn, projectData }) => {
  const [formData, setFormData] = useState({
    id: projectData.id || 0,
    name: projectData.name || "",
    description: projectData.description || "",
    orcamento_id: projectData.orcamento_id || "",
    categoryId: projectData.categoryId || "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, orcamentosData] = await Promise.all([
          fetch("http://localhost:5000/categories").then((resp) => resp.json()),
          fetch("http://localhost:5000/orcamentos").then((resp) => resp.json()),
        ]);

        setCategories(categoriesData || []);
        setOrcamentos(orcamentosData || []);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(formData as Project);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmitForm}>
      <Input
        type="text"
        text="Nome do projeto:"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleInputChange}
        value={formData.name}
        autoComplete="off"
      />
      <Input
        type="text"
        text="Descrição do projeto:"
        name="description"
        placeholder="Insira a descrição do projeto"
        handleOnChange={handleInputChange}
        value={formData.description}
        autoComplete="off"
      />
      <Orcamento
        type="select"
        text="Selecione o orçamento:"
        name="orcamento_id"
        handleOnChange={handleInputChange}
        value={formData.orcamento_id}
        options={[
          { value: "", label: "Selecione um orçamento" },
          ...orcamentos.map((orcamento) => ({
            value: String(orcamento.id),
            label: orcamento.name,
          })),
        ]}
      />
      <Select
        type="select"
        text="Selecione a categoria:"
        name="categoryId"
        handleOnChange={handleInputChange}
        value={formData.categoryId}
        options={[
          { value: "", label: "Selecione uma categoria" },
          ...categories.map((category) => ({
            value: String(category.id),
            label: category.name,
          })),
        ]}
      />
      {/* Botão de envio agora é um botão HTML simples */}
      <button type="submit" className={styles.submitButton}>
        {btn}
      </button>
    </form>
  );
};

export default ProjectForm;
