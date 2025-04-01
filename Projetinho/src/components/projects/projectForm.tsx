import { useState, useEffect } from "react";
import Input from "../form/input";
import Select from "../form/select";
import SubmitButton from "../form/submitButton";
import Orcamento from "../form/orcamento";
import styles from "./projectForm.module.css";

interface ProjectFormProps {
  handleSubmit: (formData: { name: string; orcamento_id: string; categoryId: string }) => void;
  btn: string;
  projectData: {
    name: string;
    orcamento_id: string;
    categoryId: string;
  };
}

const ProjectForm = ({ handleSubmit, btn, projectData }: ProjectFormProps) => {
  const [formData, setFormData] = useState({ ...projectData });

  const [errors, setErrors] = useState<{ name: string; orcamento_id: string; categoryId: string }>({
    name: "",
    orcamento_id: "",
    categoryId: "",
  });

  useEffect(() => {
    setFormData({ ...projectData });
  }, [projectData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = { name: "", orcamento_id: "", categoryId: "" };
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = "O nome do projeto é obrigatório.";
      valid = false;
    }

    if (!formData.orcamento_id.trim()) {
      newErrors.orcamento_id = "O orçamento é obrigatório.";
      valid = false;
    }

    if (!formData.categoryId.trim()) {
      newErrors.categoryId = "A categoria é obrigatória.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(formData);
    }
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
        options={[{ value: "", label: "Selecione um orçamento" }]}
      />
      {errors.orcamento_id && <span className={styles.error}>{errors.orcamento_id}</span>}

      <Select
        type="select"
        text="Selecione a categoria:"
        name="categoryId"
        handleOnChange={handleInputChange}
        value={formData.categoryId}
        options={[{ value: "", label: "Selecione uma categoria" }]}
      />
      {errors.categoryId && <span className={styles.error}>{errors.categoryId}</span>}

      <SubmitButton text={btn} />
    </form>
  );
};

export default ProjectForm;
