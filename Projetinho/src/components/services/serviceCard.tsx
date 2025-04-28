import styles from '../services/serviceCard.module.css';

interface ServiceCardProps {
  id: string; 
  name: string;
  cost: string;
  description: string;
  handleRemove: (id: string) => void;
  handleEdit: (id: string) => void;  
}

function ServiceCard({ id, name, cost, description, handleRemove, handleEdit }: ServiceCardProps) {
  return (
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p><span>Custo total:</span> R$ {cost}</p>
      <p>{description}</p>

      <button onClick={() => handleEdit(id)} className={styles.editButton}>
        Editar Serviço
      </button>

      <button onClick={() => handleRemove(id)} className={styles.removeButton}>
        Remover Serviço
      </button>
    </div>
  );
}

export default ServiceCard;
