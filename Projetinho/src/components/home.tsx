import styles from './home.module.css';
import savings from '../img/savings.svg';

function Home() {
  return (
    <section className={styles.homeContainer}>
      <h1>
        Bem-vindo ao <span>Costs</span>
      </h1>
      <p>Comece a gerenciar os seus projetos agora mesmo!</p>
      <img src={savings} alt="Imagem de economia representando savings" />
      <a href="/" className={styles.createProjectButton}>
        Criar Projeto
      </a>
    </section>
  );
}

export default Home;
