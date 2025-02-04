import { useState, useEffect } from "react";

import Input from "../form/input";
import Select from "../form/select";
import SubmitButton from "../form/submitButton";

import styles from "./projectForm.module.css";
import Orcamento from "../form/orcamento";

interface Category {
  id: string;
  name: string;
}

interface OrcamentoType {
  id: string;
  name: string;
}

function ProjectForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoType[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    categoryId: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Dados recebidos da API:", data); // 🔍 Verifique no console

        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error("Erro: 'categories' não é um array.");
        }

        if (Array.isArray(data.orcamentos)) {
          setOrcamentos(data.orcamentos);
        } else {
          console.error("Erro: 'orcamentos' não é um array.");
        }
      })
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulário enviado:", formData);
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

      <Orcamento
        type="select"
        text="Selecione o orçamento"
        name="budget"
        handleOnChange={handleInputChange}
        value={formData.budget}
        options={orcamentos.length > 0 ? orcamentos.map((orcamento) => ({
          value: orcamento.id,
          label: orcamento.name,
        })) : [{ value: "", label: "Nenhum orçamento disponível" }]} // Mensagem caso esteja vazio
      />

      <Select
        type="select"
        text="Selecione a categoria:"
        name="categoryId"
        handleOnChange={handleInputChange}
        value={formData.categoryId}
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
      />

      <SubmitButton text="Criar projeto" />
    </form>
  );
}

export default ProjectForm;



