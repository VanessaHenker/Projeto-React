import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateProject() {
  const [newProject, setNewProject] = useState({
    name: '',
    categoryId: '',
    orcamentoId: '',
  });
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);

  useEffect(() => {
    // Carregar categorias e orçamentos
    const fetchData = async () => {
      const categoriesData = await fetch('http://localhost:5000/categories').then((res) => res.json());
      const orcamentosData = await fetch('http://localhost:5000/orcamentos').then((res) => res.json());
      setCategories(categoriesData);
      setOrcamentos(orcamentosData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProject(newProject);
    navigate('/projects'); // Redireciona para a lista de projetos
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome do Projeto:
        <input
          type="text"
          name="name"
          value={newProject.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Categoria:
        <select
          name="categoryId"
          value={newProject.categoryId}
          onChange={handleChange}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Orcamento:
        <select
          name="orcamentoId"
          value={newProject.orcamentoId}
          onChange={handleChange}
          required
        >
          {orcamentos.map((orcamento) => (
            <option key={orcamento.id} value={orcamento.id}>
              {orcamento.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Criar Projeto</button>
    </form>
  );
}

export default CreateProject;
