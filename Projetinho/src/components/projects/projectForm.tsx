import { useState } from "react"; // Importando hook useState
import { useNavigate } from "react-router-dom"; // Importando hook useNavigate para navegação
import Input from "../form/input"; // Componente de input
import Select from "../form/select"; // Componente de select
import SubmitButton from "../form/submitButton"; // Componente de botão de submissão
import Orcamento from "../form/orcamento"; // Componente de Orcamento
import styles from "./projectForm.module.css"; // Importando o CSS

// Definindo o tipo 'Project'
interface Project {
  name: string;
  orcamento_id: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

interface OrcamentoType {
  id: string;
  name: string;
}

interface ProjectFormProps {
  handleSubmit: (updatedProject: Project) => void;
  projectData?: Project;
  btn: string;
  categories: Category[]; // Recebendo categorias como prop
  orcamentos: Orcamento[]; // Recebendo orçamentos como prop
}

function ProjectForm({ handleSubmit, projectData, btn, categories, orcamentos }: ProjectFormProps) {
  const navigate = useNavigate();

  // Inicializando o estado do formulário com os dados do projeto
  const [formData, setFormData] = useState({
    name: projectData?.name || "",
    orcamento_id: projectData?.orcamento_id || "",  // Inicializando com número
    categoryId: projectData?.categoryId || "",  // Inicializando com número
  });

  // Estado para erros no formulário
  const [errors, setErrors] = useState({
    name: "",
    orcamento_id: "",
    categoryId: "",
  });

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpando os erros para o campo alterado
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Função de validação do formulário
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", orcamento_id: "", categoryId: "" };

    if (!formData.name.trim()) {
      newErrors.name = "O nome do projeto é obrigatório.";
      valid = false;
    }
    if (!formData.orcamento_id.trim()) {
      newErrors.orcamento_id = "Selecione um orçamento.";
      valid = false;
    }
    if (!formData.categoryId.trim()) {
      newErrors.categoryId = "Selecione uma categoria.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Função para enviar o formulário
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/projects", {
        method: projectData ? "PATCH" : "POST",  // Se for um projeto existente, usa "PATCH"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/projects", {
          state: { message: "Projeto salvo com sucesso!" },
        });
      } else {
        console.error("Erro ao salvar projeto");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmitForm}>
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
