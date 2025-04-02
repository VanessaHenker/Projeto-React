import { useState } from "react";
import Input from "../form/input";
import Select from "../form/select";
import SubmitButton from "../form/submitButton";
import styles from "./projectForm.module.css";

interface ProjectFormProps {
  handleSubmit: (project: { id: string; name: string; categoryId: string; orcamento_id: string }) => void;
  projectData: { id: string; name: string; categoryId: string; orcamento_id: string };
  btn: string;
}

function ProjectForm({ handleSubmit, projectData, btn }: ProjectFormProps) {
  const [formData, setFormData] = useState(projectData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <Input type="text" text="Nome do projeto:" name="name" handleOnChange={handleInputChange} value={formData.name} />
      <Select text="Categoria:" name="categoryId" handleOnChange={handleInputChange} value={formData.categoryId} options={[]} />
      <Select text="Orçamento:" name="orcamento_id" handleOnChange={handleInputChange} value={formData.orcamento_id} options={[]} />
      <SubmitButton text={btn} />
    </form>
  );
}

export default ProjectForm;
