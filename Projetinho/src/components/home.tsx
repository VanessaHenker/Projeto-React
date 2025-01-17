import styles from './layout/home.module.css';
import savings from '../img/savings.svg';
import LinkButton from './layout/linkButton';

function Home() {
  return (
    <section className={styles.homeContainer}>
      <h1> Bem-vindo ao <span>Costs</span></h1>
      <p>Comece a gerenciar os seus projetos agora mesmo!</p>
    
      <LinkButton to="/about" text="About Us" />
       <LinkButton to="/contact" text="Contact Us" />
      <img src={savings} alt="Imagem de economia representando savings" />
    </section>
  );
}

export default Home;
