import React from "react";
import styles from "./projectCard.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import Orcamento from "../form/orcamento";
import { Link } from "react-router-dom";

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

function ProjectCard({
  id,
  name,
  category,
  orcamento_id,
  handleRemove,
  updateBudget,
}: ProjectCardProps) {
  // Definindo as opções de orçamento
  const orcamentoOptions: Option[] = [
    { value: "1", label: "R$ 1.500,00" },
    { value: "2", label: "R$ 2.000,00" },
    { value: "3", label: "R$ 3.000,00" },
    { value: "4", label: "R$ 5.250,00" },
  ];

  // Função para lidar com a mudança do orçamento
  const handleBudgetChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const newBudgetId = e.target.value;
    updateBudget(id, newBudgetId);
  };

  // Função para determinar a classe da categoria
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
          type="select"
          text="Orçamento:"
          name={`orcamento-${id}`}
          value={orcamento_id}
          handleOnChange={handleBudgetChange}
          options={orcamentoOptions}
        />
      </div>


      <p className={`${styles.categoryText} ${getCategoryClass(category)}`}>
        <span className={styles.categoryDot}></span> {category}
      </p>

     
      <div className={styles.actions}>
        <p className={styles.icons}>
          <Link to={`/projectOne/${id}`}> 
            Editar <BsPencil className={styles.icon} />
          </Link>
        </p>
        <p className={styles.icons}>
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
