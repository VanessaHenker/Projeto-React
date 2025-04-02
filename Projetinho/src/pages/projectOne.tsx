import { useState, useEffect } from "react"; // Importando hooks do React
import { useParams } from "react-router-dom"; // Importando hook para capturar parâmetros da URL
import styles from "./projectOne.module.css"; // Importando o CSS
import Container from "../components/layout/container"; // Componente Container
import { FaTags, FaMoneyBillAlt, FaClipboardList } from "react-icons/fa"; // Ícones para exibir no projeto
import ProjectForm from "../components/projects/projectForm"; // Componente de formulário para editar

// Definindo os tipos dos dados que vamos usar
interface Project {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  orcamento_id: number;
}

interface Category {
  id: number;
  name: string;
}

interface Orcamento {
  id: number;
  name: string;
  used: number;
}

function ProjectOne() {
  // Pegando o parâmetro 'id' da URL
  const { id } = useParams<{ id: string }>();
  
  // Definindo os estados
  const [project, setProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para alternar a exibição do formulário de edição
  const toggleProjectForm = () => setShowProjectForm((prev) => !prev);

  // Fazendo a requisição para carregar os dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregando os dados do projeto, categorias e orçamentos
        const [projectRes, categoriesRes, orcamentosRes] = await Promise.all([
          fetch(`http://localhost:5000/projects/${id}`),
          fetch("http://localhost:5000/categories"),
          fetch("http://localhost:5000/orcamentos"),
        ]);

        // Verificando se todas as requisições deram certo
        if (!projectRes.ok || !categoriesRes.ok || !orcamentosRes.ok) {
          throw new Error("Erro ao carregar dados");
        }

        // Convertendo os dados para o formato JSON
        const projectData = await projectRes.json();
        const categoriesData = await categoriesRes.json();
        const orcamentosData = await orcamentosRes.json();

        // Verificando se os dados recebidos são válidos
        if (!projectData || !categoriesData || !orcamentosData) {
          throw new Error("Dados inválidos recebidos");
        }

        // Armazenando os dados no estado
        setProject(projectData);
        setCategories(categoriesData);
        setOrcamentos(orcamentosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false); // Indica que o carregamento foi concluído
      }
    };

    if (id) {
      fetchData(); // Carregar os dados se o id estiver disponível
    }
  }, [id]);

  // Encontrando a categoria e o orçamento do projeto
  const projectCategory = categories.find((category) => category.id === project?.categoryId);
  const projectBudget = orcamentos.find((orcamento) => orcamento.id === project?.orcamento_id);

  // Calculando o total utilizado, ou R$ 0,00 se não houver valor
  const totalUtilizado = projectBudget?.used ? `R$ ${projectBudget.used.toFixed(2)}` : "R$ 0,00";

  // Função para editar o projeto
  const editPost = (updatedProject: Project) => {
    fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProject),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setProject(data); // Atualiza o projeto com os novos dados
          setShowProjectForm(false); // Fecha o formulário
        } else {
          console.error("Erro ao editar projeto: Dados inválidos");
        }
      })
      .catch((error) => console.error("Erro ao editar o projeto:", error));
  };

  // Exibindo mensagem enquanto carrega
  if (loading) {
    return <div className={styles.loadingMessage}>Carregando projeto...</div>;
  }

  // Exibindo mensagem caso o projeto não seja encontrado
  if (!project) {
    return <div className={styles.loadingMessage}>Projeto não encontrado</div>;
  }

  return (
    <div className={styles.projectContainer}>
      <Container>
        <div className={styles.mainContent}>
          <h1 className={styles.projectTitle}>Projeto: {project.name}</h1>

          <button onClick={toggleProjectForm}>
            {showProjectForm ? "Cancelar edição" : "Editar projeto"}
          </button>

          {!showProjectForm ? (
            <div>
              <p className={styles.projectDescription}>
                <FaTags className={styles.icon} />
                <span>Categoria:</span> {projectCategory?.name || "Categoria desconhecida"}
              </p>
              <p className={styles.projectDescription}>
                <FaMoneyBillAlt className={styles.icon} />
                <span>Total de Orçamento:</span> {projectBudget?.name || "Orçamento não disponível"}
              </p>
              <p className={styles.projectDescription}>
                <FaClipboardList className={styles.icon} />
                <span>Total Utilizado:</span> {totalUtilizado}
              </p>
            </div>
          ) : (
            <div className={styles.projectInfo}>
              <ProjectForm
                handleSubmit={editPost}
                btn="Concluir edição"
                projectData={project}
                categories={categories}  // Passando categorias
                orcamentos={orcamentos}  // Passando orçamentos
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
