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

interface ProjectFormProps {
  handleSubmit: (formData: { name: string; orcamento_id: string; categoryId: string }) => void;
  btn: string;
  projectData: {
    name: string;
    orcamento_id: string;
    categoryId: string;
  };
}

function ProjectForm({ handleSubmit, btn, projectData }: ProjectFormProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: projectData.name,
    orcamento_id: projectData.orcamento_id,
    categoryId: projectData.categoryId,
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
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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

    setErrors(newErrors);
    return valid;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    handleSubmit(formData); // Passa o formData para o handleSubmit
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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

      <SubmitButton text={btn} />
    </form>
  );
}

export default ProjectForm;
