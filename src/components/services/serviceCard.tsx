import styles from '../services/serviceCard.module.css';

interface Service {
  id: string;
  name: string;
  cost: string;
  description: string;
}

interface ServiceCardProps {
  id: string;
  name: string;
  cost: string;
  description: string;
  handleRemove: (id: string) => void;
  handleEdit: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, name, cost, description, handleRemove, handleEdit }) => {
  return (
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p><span>Custo total:</span> R$ {cost}</p>
      <p><span>Descrição:</span> {description}</p>
      <button onClick={() => handleEdit({ id, name, cost, description })} className={styles.editButton}>
        Editar Serviço
      </button>

      <button onClick={() => handleRemove(id)} className={styles.removeButton}>
        Remover Serviço
      </button>
    </div>
  );
};

export default ServiceCard;
