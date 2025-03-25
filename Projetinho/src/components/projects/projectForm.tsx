import { useState, useEffect } from "react";
import Input from "../form/input";
import Select from "../form/select";
import SubmitButton from "../form/submitButton";
import Orcamento from "../form/orcamento";
import styles from "./projectForm.module.css";


interface ProjectFormProps {
  handleSubmit: (project: Project) => void; 
  btn: string; 
  projectData: Project;
  isForm: boolean; 
}

interface Category {
  id: string;
  name: string;
}

interface OrcamentoType {
  id: string;
  name: string;
}

function ProjectForm({ handleSubmit, btn, projectData, isForm }: ProjectFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoType[]>([]);

  // Função para buscar categorias e orçamentos
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

  return (
    // A classe condicional é aplicada diretamente no <form>
    <form 
      className={isForm ? styles.form : styles.otherComponent} 
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(projectData); // Envia os dados do projeto
      }}
    >
      <Input
        type="text"
        text="Nome do projeto:"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={() => {}}
        value={projectData.name}
      />

      {/* Campo de Orçamento */}
      <Orcamento
        type="select"
        text="Selecione o orçamento:"
        name="orcamento_id"
        handleOnChange={() => {}}
        value={projectData.orcamento_id}
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
        handleOnChange={() => {}}
        value={projectData.categoryId}
        options={[
          { value: "", label: "Selecione uma categoria" },
          ...categories.map((category) => ({
            value: String(category.id),
            label: category.name,
          })),
        ]}
      />

      <SubmitButton text={btn} />
    </form>
  );
}

export default ProjectForm;
