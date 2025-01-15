
import savings from '../img/savings.svg'


function Home() {
  return (
    <section >
      <h1>Bem-vindo ao <span>Costs</span></h1>
      <p>Comece a gerenciar os seus projetos agor mesmo!</p>
      <a href="/">Criar projeto</a>

      <img src={savings} alt="Costs" />
    </section>
  );
}

export default Home;
