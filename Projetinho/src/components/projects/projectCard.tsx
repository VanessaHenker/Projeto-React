import styles from './projectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

interface ProjectCardProps {
  id: string;
  name: string;
  budget: string; // Orçamento como string
  category: string;
  handleRemove: (id: string) => void;
}

function ProjectCard({ id, name, budget, category, handleRemove }: ProjectCardProps) {
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
        <span>Orçamento:</span> {budget} {/* Exibindo o orçamento corretamente */}
      </p>
      <p className={styles.categoryText}>
        <span className={`${styles[category?.toLowerCase() || 'defaultCategory']}`}></span> {category}
      </p>
    </div>
  );
}

export default ProjectCard;
