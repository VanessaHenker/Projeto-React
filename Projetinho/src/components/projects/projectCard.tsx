import styles from './projectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

interface ProjectCardProps {
  id: number;
  name: string;
  budget: string;  // O orçamento vem como string (ex: "R$ 1.500,00")
  category: string;
  handleRemove: (id: number) => void;
}

function ProjectCard({ id, name, budget, category, handleRemove }: ProjectCardProps) {
  console.log('Rendering project:', { id, name, budget, category }); // Log para depuração
  
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
        <span>Orçamento:</span> {budget || 'R$ 0,00'}  {/* Exibe diretamente o valor do orçamento */}
      </p>
      <p className={styles.categoryText}>
        <span className={`${styles[category?.toLowerCase()]}`}></span> {category}
      </p>
    </div>
  );
}

export default ProjectCard;
