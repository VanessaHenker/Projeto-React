import { useState, FormEvent } from 'react';

interface Project {
  name: string;
  categoryId?: string;
  orcamento_id: string; // ID do orçamento selecionado
}

interface ProjectFormProps {
  handleSubmit: (project: Project) => Promise<void>;
  btnText: string;
  projectData?: Project;
}

function ProjectForm({ handleSubmit, btnText, projectData }: ProjectFormProps) {
  const [project, setProject] = useState<Project>(
    projectData || { name: '', categoryId: '', orcamento_id: '' }
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(project);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label>Nome do Projeto</label>
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Categoria</label>
        <input
          type="text"
          name="categoryId"
          value={project.categoryId}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Orçamento</label>
        <select
          name="orcamento_id"
          value={project.orcamento_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um orçamento</option>
          <option value="1000">Orçamento A - R$1000</option>
          <option value="2000">Orçamento B - R$2000</option>
          <option value="3000">Orçamento C - R$3000</option>
        </select>
      </div>

      <button type="submit">{btnText}</button>
    </form>
  );
}

export default ProjectForm;
