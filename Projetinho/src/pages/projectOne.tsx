import { useParams } from "react-router-dom";

function ProjectOne() {
  const { id } = useParams();

  return (
    <div>
      <p>Projeto com ID: {id}</p>
    </div>
  );
}

export default ProjectOne;
