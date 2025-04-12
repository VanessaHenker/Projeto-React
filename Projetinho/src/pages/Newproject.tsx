import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../project/ProjectForm";
import { url } from "../../utils/url";
import post from "../../utils/post";
import Orcamento from "../../hooks/useOrcamento";

function NewProject() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { orcamentos } = Orcamento();

  function createPost(project: any) {
    post(`${url}/projects`, project).then((response) => {
      if (response && response.error) {
        setMessage("Erro ao criar o projeto. Verifique os dados.");
        return;
      }

      setMessage("Projeto criado com sucesso!");
      navigate("/projects", {
        state: { message: "Projeto criado com sucesso!" },
      });
    }).catch(() => {
      setMessage("Erro na conexão com o servidor.");
    });
  }

  return (
    <div className="container">
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços.</p>
      {message && <p className="message">{message}</p>}
      <ProjectForm handleSubmit={createPost} orcamentos={orcamentos} />
    </div>
  );
}

export default NewProject;
