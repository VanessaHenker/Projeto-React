import { useLocation } from 'react-router-dom';
import Message from '../components/layout/message';


function Projects() {
  const location = useLocation();
  let message = '';

  if (location.state) {
    message = location.state.message;
  }

  return (
    <div className='teste'>
      <h1 className='tittle'>Meus Projetos</h1>
      {message && <Message type="success" msg={message} />}
    </div>
  );
}

export default Projects;
