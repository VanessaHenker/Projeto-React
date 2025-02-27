import React from 'react';
import styles from './projectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import Orcamento from '../Orcamento';

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
}

function ProjectCard({
  id,
  name,
  category,
  orcamento_id,
  handleRemove,
}: ProjectCardProps) {
  // Exemplo de opções para o orçamento. Essas opções podem ser substituídas por dados reais ou passadas via props.
  const orcamentoOptions: Option[] = [
    { value: "1", label: "R$ 1.500,00" },
    { value: "2", label: "R$ 2.000,00" },
    { value: "3", label: "R$ 3.000,00" },
    { value: "4", label: "R$ 5.250,00" },
  ];

  const handleBudgetChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    console.log(`Projeto ${id} - Novo orçamento selecionado:`, e.target.value);
    // Implemente aqui a lógica para atualizar o orçamento do projeto, se necessário.
  };

  return (
    <div className={styles.projectCard}>
      <div className={styles.header}>
        <h4>{name}</h4>
        <div className={styles.actions}>
          <BsPencil className={styles.icon} />
          <BsFillTrashFill className={styles.icon} onClick={() => handleRemove(id)} />
        </div>
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
        <span className={`${styles[category?.toLowerCase() || 'defaultCategory']}`}></span> {category}
      </p>
      <p className={styles.orcamentoId}>
        Orcamento ID: {orcamento_id}
      </p>
    </div>
  );
}

export default ProjectCard;
