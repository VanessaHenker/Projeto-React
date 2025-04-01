import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../form/input";
import Select from "../form/select";
import SubmitButton from "../form/submitButton";
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

function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    name: "",
    orcamento_id: "",
    categoryId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    orcamento_id: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, orcamentosData] = await Promise.all([
          fetch("http://localhost:5000/categories").then((resp) => resp.json()),
          fetch("http://localhost:5000/orcamentos").then((resp) => resp.json()),
        ]);

        setCategories(categoriesData || []);
        setOrcamentos(orcamentosData || []);

        if (id) {
          const projectResponse = await fetch(`http://localhost:5000/projects/${id}`);
          const projectData = await projectResponse.json();
          setFormData({
            name: projectData.name,
            orcamento_id: projectData.orcamento_id,
            categoryId: projectData.categoryId,
          });
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Limpar erro ao alterar o valor
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", orcamento_id: "", categoryId: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Nome do projeto é obrigatório";
      valid = false;
    }
    if (!formData.orcamento_id.trim()) {
      newErrors.orcamento_id = "Orçamento é obrigatório";
      valid = false;
    }
    if (!formData.categoryId.trim()) {
      newErrors.categoryId = "Categoria é obrigatória";
      valid = false;
    }

    setErrors(newErrors); // Atualiza os erros no estado
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const method = id ? "PATCH" : "POST";
      const url = id ? `http://localhost:5000/projects/${id}` : "http://localhost:5000/projects";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/projects", {
          state: { message: id ? "Projeto atualizado com sucesso!" : "Projeto criado com sucesso!" },
        });
      } else {
        console.error("Erro ao salvar o projeto");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        text="Nome do projeto:"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleInputChange}
        value={formData.name}
      />
      {errors.name && <span className={styles.error}>{errors.name}</span>}

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
      {errors.orcamento_id && <span className={styles.error}>{errors.orcamento_id}</span>}

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
      {errors.categoryId && <span className={styles.error}>{errors.categoryId}</span>}

      <SubmitButton text={id ? "Atualizar projeto" : "Criar projeto"} />
    </form>
  );
}

export default ProjectForm;
