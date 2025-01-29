interface Project {
  name: string;
  budget: number;
  cost?: number;
  services?: any[];
}

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
  loading: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, loading }) => {
  // Lógica do formulário...
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const project: Project = { name: "Novo Projeto", budget: 1000 };
      onSubmit(project);
    }}>
      <button type="submit" disabled={loading}>
        {loading ? "Criando..." : "Criar Projeto"}
      </button>
    </form>
  );
};

export default ProjectForm;
