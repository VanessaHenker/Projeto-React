// src/components/projects/projectCard.jsx
import styles from './projectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

function ProjectCard({ id, name, budget, category, handleRemove }) {
  return (
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R$ {budget}
      </p>
      <p className={styles.categoryText}>
        <span className={`${styles[category?.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.actions}>
        <BsPencil className={styles.icon} />
        <BsFillTrashFill
          className={styles.icon}
          onClick={() => handleRemove(id)}
        />
      </div>
    </div>
  );
}

export default ProjectCard;
