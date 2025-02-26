import styles from './projectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

interface ProjectCardProps {
  id: string;
  name: string;
  budget: string;
  category: string;
  orcamento_id: string; // Passando orcamento_id como propriedade
  handleRemove: (id: string) => void;
}

function ProjectCard({ id, name, budget, category, orcamento_id, handleRemove }: ProjectCardProps) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.header}>
        <h4>{name}</h4>
        <div className={styles.actions}>
          <BsPencil className={styles.icon} />
          <BsFillTrashFill
            className={styles.icon}
            onClick={() => handleRemove(id)}
          />
        </div>
      </div>
      <p className={styles.budget}>
        <span>Orçamento:</span> {budget}
      </p>
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
