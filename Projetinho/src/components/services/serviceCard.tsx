import styles from '../services/serviceCard.module.css'

function ServiceCard(id, name, cost, description, handleRemove) {
  return (
    <div className= {styles.projectCard}>
      <h4>{name}</h4>
      <p><Span>Custo total:</Span> R$ {cost}</p>
      <p>{description}</p>
    </div>
  )
}

export default ServiceCard
