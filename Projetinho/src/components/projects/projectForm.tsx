import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoType[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    categoryId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    budget: "",
    categoryId: "",
  });

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
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Limpa o erro quando o usuário começa a digitar
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", budget: "", categoryId: "" };

    if (!formData.name.trim() || !formData.budget || !formData.categoryId) {
      alert('Campos obrigatórios!')
      valid = false;
    }
    else{
      setErrors(newErrors);
      return valid;
    }
    
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    try {
      const response = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/projects", { state: { message: "Projeto criado com sucesso!" } });
      } else {
        console.error("Erro ao criar projeto");
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
        text="Selecione o orçamento"
        name="budget"
        handleOnChange={handleInputChange}
        value={formData.budget}
        options={[
          { value: "", label: "Selecione um orçamento" },
          ...orcamentos.map((orcamento) => ({
            value: String(orcamento.id),
            label: orcamento.name,
          }))
        ]}
      />
      {errors.budget && <span className={styles.error}>{errors.budget}</span>}

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
          }))
        ]}
      />
      {errors.categoryId && <span className={styles.error}>{errors.categoryId}</span>}

      <SubmitButton text="Criar projeto" />
    </form>
  );
}

export default ProjectForm;
