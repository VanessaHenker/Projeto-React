import { useEffect, useState } from "react";
import { Category, Orcamento, ProjectType } from "../../types/ProjectType";
import { url } from "../../utils/url";
import OrcamentoForm from "../orcamento/Orcamento";

type ProjectFormProps = {
  btnText: string;
  handleSubmit: (project: ProjectType) => void;
  projectData?: ProjectType;
};

function ProjectForm({ btnText, handleSubmit, projectData }: ProjectFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [project, setProject] = useState<ProjectType>(projectData || {});

  useEffect(() => {
    fetch(`${url}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));

    fetch(`${url}/orcamentos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOrcamentos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(project);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories.find(
      (cat) => cat.id === Number(e.target.value)
    );
    setProject({
      ...project,
      category_id: Number(e.target.value),
      category: selectedCategory?.name || "",
    });
  };

  const handleOrcamento = (orcamento_id: number) => {
    const selectedOrcamento = orcamentos.find((o) => o.id === orcamento_id);
    setProject({
      ...project,
      orcamento_id,
      orcamento: selectedOrcamento?.name || "",
    });
  };

  return (
    <form onSubmit={submit} className="form">
      <div className="input-container">
        <label htmlFor="name">Nome do Projeto:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Insira o nome do projeto"
          onChange={handleChange}
          value={project.name || ""}
        />
      </div>

      <div className="input-container">
        <label htmlFor="budget">Orçamento:</label>
        <input
          type="number"
          name="budget"
          id="budget"
          placeholder="Insira o orçamento total"
          onChange={handleChange}
          value={project.budget || ""}
        />
      </div>

      <div className="input-container">
        <label htmlFor="category">Categoria:</label>
        <select
          name="category_id"
          id="category"
          onChange={handleCategory}
          value={project.category_id || ""}
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <OrcamentoForm
        orcamentos={orcamentos}
        selectedOrcamento={project.orcamento_id}
        onSelectOrcamento={handleOrcamento}
      />

      <button type="submit">{btnText}</button>
    </form>
  );
}

export default ProjectForm;
