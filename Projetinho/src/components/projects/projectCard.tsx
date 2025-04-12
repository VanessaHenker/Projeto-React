import { Link } from "react-router-dom";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { url } from "../../utils/url";  // Verifique o caminho e a exportação correta

type ProjectCardProps = {
  id: number;
  name: string;
  budget: number;
  category: string;
  orcamento: string;
  onRemove?: (id: number) => void; // Ação de remoção opcional
};

function ProjectCard({
  id,
  name,
  budget,
  category,
  orcamento,
  onRemove,
}: ProjectCardProps) {
  const handleRemove = async () => {
    try {
      const response = await fetch(`${url}/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok && onRemove) {
        onRemove(id); // Notifica o pai para remover localmente
      } else {
        console.error("Erro ao excluir projeto");
      }
    } catch (err) {
      console.error("Erro de requisição ao excluir projeto:", err);
    }
  };

  return (
    <div className="project-card">
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R$ {budget}
      </p>
      <p>
        <span>Categoria:</span> {category}
      </p>
      <p>
        <span>Orçamento Escolhido:</span> {orcamento}
      </p>
      <div className="project-card-actions">
        <Link to={`/project/${id}`} className="button-link">
          <BsPencil /> Editar
        </Link>
        <button onClick={handleRemove}>
          <BsFillTrashFill /> Remover
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
