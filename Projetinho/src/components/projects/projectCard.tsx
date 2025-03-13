import React from "react";
import styles from "./projectCard.module.css";
import Orcamento from "../form/orcamento";
import ActionButton from "../layout/actionButton";

// Definindo o tipo de opção
interface Option {
  value: string;
  label: string;
}

interface ProjectCardProps {
  id: string;
  name: string;
  categoryId: string; // Usando categoryId direto
  orcamento_id: string; // Usando orcamento_id direto
  handleRemove: (id: string) => void;
  updateBudget: (id: string, newBudgetId: string) => void;
  categories: { id: string; name: string }[]; // Lista de categorias para mapear categoryId
  orcamentos: { id: string; name: string }[]; // Lista de orçamentos para mapear orcamento_id
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  categoryId,
  orcamento_id,
  handleRemove,
  updateBudget,
  categories,
  orcamentos,
}) => {
  // Função para obter o nome da categoria
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Categoria desconhecida";
  };

  // Função para obter o nome do orçamento
  const getOrcamentoName = (orcamentoId: string) => {
    const orcamento = orcamentos.find((orc) => orc.id === orcamentoId);
    return orcamento ? orcamento.name : "Orçamento desconhecido";
  };

  // Definindo as opções de orçamento
  const orcamentoOptions: Option[] = orcamentos.map((orc) => ({
    value: orc.id,
    label: orc.name,
  }));

  // Função para lidar com a mudança do orçamento
  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const newBudgetId = e.target.value;
    updateBudget(id, newBudgetId);
  };

  // Função para determinar a classe da categoria
  const getCategoryClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "desenvolvimento":
        return styles.development;
      case "design":
        return styles.design;
      case "planejamento":
        return styles.management;
      default:
        return styles.defaultCategory;
    }
  };

  return (
    <div className={styles.projectCard}>
      <div className={styles.header}>
        <h4>{name}</h4>
      </div>
      <div className={styles.budgetSection}>
        <Orcamento
          type="select"
          text="Orçamento:"
          name={`orcamento-${id}`}
          value={orcamento_id}
          handleOnChange={handleBudgetChange}
          options={orcamentoOptions}
        />
      </div>

      <p className={`${styles.categoryText} ${getCategoryClass(getCategoryName(categoryId))}`}>
        <span className={styles.categoryDot}></span> {getCategoryName(categoryId)}
      </p>

      <div className={`${styles.contentButtons}`}> {/* Use contentButtons, não contentButton */}
        <ActionButton
          type="edit"
          label="Editar"
          iconClass={styles.icon}
          to={`/projectOne/${id}`}
        />

        <ActionButton
          type="delete"
          label="Excluir"
          iconClass={styles.icon}
          onClick={() => handleRemove(id)}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
