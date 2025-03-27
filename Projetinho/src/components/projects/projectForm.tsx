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

interface Project {
  id: string;
  name: string;
  orcamento_id: string;
  categoryId: string;
}

function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Recebe o ID do projeto a ser editado

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    name: "",
    orcamento_id: "",
    categoryId: "",
  });

  // Estado para erros do formulário
  const [errors, setErrors] = useState({
    name: "",
    orcamento_id: "",
    categoryId: "",
  });

  // Estados para categorias e orçamentos
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoType[]>([]);

  // Buscar os dados de categorias e orçamentos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, orcamentosData] = await Promise.all([
          fetch("http://localhost:5000/categories").then((resp) => resp.json()),
          fetch("http://localhost:5000/orcamentos").then((resp) => resp.json()),
        ]);

        setCategories(categoriesData || []);
        setOrcamentos(orcamentosData || []);

        // Se estamos editando um projeto, vamos carregar os dados do projeto
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

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpa o erro para o campo alterado
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Função de validação do formulário
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", orcamento_id: "", categoryId: "" };

    if (!formData.name.trim() || !formData.orcamento_id.trim() || !formData.categoryId.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const method = id ? "PATCH" : "POST"; // Se tem um ID, é uma edição, então usamos PATCH
      const url = id ? `http://localhost:5000/projects/${id}` : "http://localhost:5000/projects"; // URL para edição ou criação

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
      {errors.orcamento_id && (
        <span className={styles.error}>{errors.orcamento_id}</span>
      )}

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
      {errors.categoryId && (
        <span className={styles.error}>{errors.categoryId}</span>
      )}

      <SubmitButton text={id ? "Atualizar projeto" : "Criar projeto"} />
    </form>
  );
}

export default ProjectForm;
