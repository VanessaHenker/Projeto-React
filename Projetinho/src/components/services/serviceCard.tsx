import styles from '../services/serviceCard.module.css';

interface ServiceCardProps {
  id: string;
  name: string;
  cost: string;
  description: string;
}

function ServiceCard({ id, name, cost, description }: ServiceCardProps) {
  return (
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p><span>Custo total:</span> R$ {cost}</p>
      <p>{description}</p>
    </div>
  );
}

export default ServiceCard;
