import { useState, useEffect } from "react";

interface Project {
  id?: string;
  name: string;
  category: string;
  budget: number;
}

interface ProjectFormProps {
  handleSubmit: (project: Project) => void;
  projectData?: Project;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ handleSubmit, projectData }) => {
  // Estado inicial seguro, evitando undefined
  const [project, setProject] = useState<Project>({
    name: "",
    category: "",
    budget: 0,
  });

  // Atualiza o estado se projectData mudar
  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [projectData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(project);
  };

  return (
    <form onSubmit={submit}>
      <label>Nome do Projeto:</label>
      <input
        type="text"
        name="name"
        value={project.name}
        onChange={handleChange}
        required
      />

      <label>Categoria:</label>
      <select name="category" value={project.category} onChange={handleChange} required>
        <option value="">Selecione</option>
        <option value="Web">Web</option>
        <option value="Mobile">Mobile</option>
      </select>

      <label>Orçamento:</label>
      <input
        type="number"
        name="budget"
        value={project.budget}
        onChange={handleChange}
        required
      />

      <button type="submit">Criar Projeto</button>
    </form>
  );
};

export default ProjectForm;
