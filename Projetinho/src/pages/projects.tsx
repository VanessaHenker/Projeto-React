import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { url } from "../../utils/url";
import ProjectCard from "../project/ProjectCard";
import Orcamento from "../../hooks/useOrcamento";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const { orcamentos } = Orcamento();

  useEffect(() => {
    fetch(`${url}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
        setRemoveLoading(true);
      })
      .catch((error) => {
        console.error("Erro ao buscar projetos:", error);
      });
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  return (
    <section className="project-container">
      <div className="title-container">
        <h1>Meus Projetos</h1>
      </div>
      {message && <p className="message">{message}</p>}
      <div className="project-list">
        {projects.length > 0 &&
          projects.map((project: any) => {
            const orcamento = orcamentos.find(
              (orcamento: any) => orcamento.id === project.orcamento_id
            );

            return (
              <ProjectCard
                id={project.id}
                name={project.name}
                budget={project.budget}
                category={project.category}
                orcamento={orcamento ? orcamento.name : "Não definido"}
                key={project.id}
              />
            );
          })}
        {!removeLoading && <p>Carregando...</p>}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados.</p>
        )}
      </div>
    </section>
  );
}

export default Projects;
