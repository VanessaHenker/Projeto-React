import React, { useEffect, useState } from "react";
import styles from "./projectCard.module.css";
import Orcamento from "../form/orcamento";
import ActionButton from "../layout/actionButton";

interface Option {
  value: string;
  label: string;
}

interface ProjectCardProps {
  id: string | number; // id pode ser string ou number
  name: string;
  category: string;
  orcamento_id: string;
  orcamentoNome?: string;
  handleRemove: (id: string) => void; // Garantir que a função aceite id como string
  updateBudget: (id: string, newBudgetId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  category,
  orcamento_id,
  orcamentoNome,
  handleRemove,
  updateBudget,
}) => {
  const [orcamentoOptions, setOrcamentoOptions] = useState<Option[]>([]);
  const [currentOrcamento, setCurrentOrcamento] = useState<string>(orcamento_id);

  useEffect(() => {
    fetch("http://localhost:5000/orcamentos")
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((orcamento: { id: string; name: string }) => ({
          value: orcamento.id,
          label: orcamento.name,
        }));
        setOrcamentoOptions(options);
      })
      .catch((error) => {
        console.error("Erro ao carregar os orçamentos:", error);
      });
  }, []);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBudgetId = e.target.value;

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orcamento_id: newBudgetId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar o orçamento.");
        return res.json();
      })
      .then(() => {
        updateBudget(id.toString(), newBudgetId); // Garantir que id seja convertido para string
        setCurrentOrcamento(newBudgetId);
      })
      .catch((error) => {
        console.error("Erro ao atualizar orçamento:", error);
      });
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

      {orcamentoNome && (
        <p className={styles.budgetName}>
          Orçamento atual: <strong>{orcamentoNome}</strong>
        </p>
      )}

      <div className={styles.budgetSection}>
        <Orcamento
          text="Alterar Orçamento:"
          name="orcamento_id"
          value={currentOrcamento}
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
  to={`/projectOne/${id.toString()}`}
/>


        <ActionButton
          type="delete"
          label="Excluir"
          iconClass={styles.icon}
          onClick={() => handleRemove(id.toString())} // Garantir que id seja convertido para string
        />
      </div>
    </div>
  );
};

export default ProjectCard;
