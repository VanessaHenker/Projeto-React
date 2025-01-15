import styles from './home.module.css';

function Home() {
  return (
    <section className={styles.home}>
      <h1>Bem-vindo ao <span>Costs</span></h1>
      <p>Comece a gerenciar os seus projetos agor mesmo!</p>
      <a href="/">Criar projeto</a>
    </section>
  );
}

export default Home;
