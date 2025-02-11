import { useLocation } from 'react-router-dom';
import Message from '../components/layout/message';
import styles from '../pages/projects.module.css';
import Container from '../components/layout/container';
import LinkButton from '../components/layout/linkButton';

function Projects() {
  const location = useLocation();
  const message = location.state?.message || '';

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus Projetos</h1>

        <LinkButton text="Criar Projeto" to="/criar-projeto" />
      </div>
      
      {message && <Message type="success" msg={message} />}
      <Container customClass="start">
        <p>Projetos..</p>
      </Container>
    </div>
  );
}

export default Projects;
