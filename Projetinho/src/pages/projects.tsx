import { useLocation } from 'react-router-dom';
import Message from '../components/layout/message';
import '../pages/projects.module.css'
import Container from '../components/layout/container';
import LinkButton from '../components/layout/linkButton';

function Projects() {
  const location = useLocation();
  let message = '';

  if (location.state) {
    message = location.state.message;
  }

  return (
    <div className='teste'>
      <h1 className='tittle'>Meus Projetos</h1>
      <LinkButton text='Novo projeto'/>
      {message && <Message type="success" msg={message} />}
      <Container customClass='start'>
        <p>Projetos..</p>

      </Container>
    </div>
  );
}

export default Projects;
