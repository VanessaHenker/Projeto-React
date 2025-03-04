import React from "react";
import styles from "./projectCard.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import Orcamento from "../form/orcamento";

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

function ProjectCard({
  id,
  name,
  category,
  orcamento_id,
  handleRemove,
  updateBudget,
}: ProjectCardProps) {
  // Opções de orçamento – podem ser obtidas de um arquivo de configuração ou via props
  const orcamentoOptions: Option[] = [
    { value: "1", label: "R$ 1.500,00" },
    { value: "2", label: "R$ 2.000,00" },
    { value: "3", label: "R$ 3.000,00" },
    { value: "4", label: "R$ 5.250,00" },
  ];

  const handleBudgetChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const newBudgetId = e.target.value;
    updateBudget(id, newBudgetId);
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
      <p className={styles.categoryText}>
        <span
          className={`${styles[category?.toLowerCase() || "defaultCategory"]}`}
        ></span>{" "}
        {category}
      </p>

      <div className={styles.actions}>
        <p>
          Editar <BsPencil className={styles.icon} />
        </p>
        <p>
          Excluir{" "}
          <BsFillTrashFill
            className={styles.icon}
            onClick={() => handleRemove(id)}
          />
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
