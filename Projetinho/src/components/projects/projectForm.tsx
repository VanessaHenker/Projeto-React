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
  }, []); // Garante que os dados sejam buscados apenas uma vez

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulário enviado:", formData);
  };

  // Verifique os dados antes de renderizar
  console.log("Categorias:", categories);
  console.log("Orçamentos:", orcamentos);
  console.log("FormData:", formData);

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
        options={
          orcamentos.length > 0
            ? orcamentos.map((orcamento) => ({
                value: String(orcamento.id),
                label: orcamento.name,
              }))
            : [{ value: "", label: "Nenhum orçamento disponível" }]
        }
      />

      <Select
        type="select"
        text="Selecione a categoria:"
        name="categoryId"
        handleOnChange={handleInputChange}
        value={formData.categoryId}
        options={
          categories.length > 0
            ? categories.map((category) => ({
                value: String(category.id),
                label: category.name,
              }))
            : [{ value: "", label: "Nenhuma categoria disponível" }]
        }
      />

      <SubmitButton text="Criar projeto" />
    </form>
  );
}

export default ProjectForm;
