import React, { useEffect, useState } from "react";
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
  category: string;
  orcamento_id: string;
  handleRemove: (id: string) => void;
  updateBudget: (id: string, newBudgetId: string) => void; 
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  category,
  orcamento_id,
  handleRemove,
  updateBudget,
}) => {
  const [orcamentoOptions, setOrcamentoOptions] = useState<Option[]>([]);

  // Carrega as opções de orçamento
  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const response = await fetch("http://localhost:5000/orcamentos");
        const data = await response.json();
        const options = data.map((orcamento: { id: string, name: string }) => ({
          value: orcamento.id,
          label: orcamento.name,
        }));
        setOrcamentoOptions(options);
      } catch (error) {
        console.error("Erro ao carregar os orçamentos:", error);
      }
    };

    fetchOrcamentos();
  }, []);

  // Atualiza orçamento via API
  const handleBudgetChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBudgetId = e.target.value;

    try {
      const response = await fetch(`http://localhost:5000/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orcamento_id: newBudgetId,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar o orçamento.");

      updateBudget(id, newBudgetId);
    } catch (error) {
      console.error("Erro ao atualizar orçamento:", error);
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "development":
        return styles.development;
      case "design":
        return styles.design;
      case "management":
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
          text="Orçamento:"
          name="orcamento_id"
          value={orcamento_id}
          handleOnChange={handleBudgetChange}
          options={orcamentoOptions}
        />
      </div>

      <p className={`${styles.categoryText} ${getCategoryClass(category)}`}>
        <span className={styles.categoryDot}></span> {category}
      </p>

      <div className={styles.contentButtons}>
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