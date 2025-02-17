import styles from './projectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

interface ProjectCardProps {
  id: number | string;
  name: string;
  budget: number;
  category: string;
  handleRemove: (id: number | string) => void;
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
        <span>Orçamento:</span> R$ {budget}
      </p>
      <p className={styles.categoryText}>
        <span className={`${styles[category?.toLowerCase()]}`}></span> {category}
      </p>
    </div>
  );
}

export default ProjectCard;
