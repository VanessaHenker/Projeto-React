import './app.css';

import { BrowserRouter } from 'react-router-dom';
import { Footer } from './componentes/footer';
import { AppRoutes } from './routes';
import Frase from './componentes/frases';
import SayMyName from './componentes/sayMyName';

function App() {
  const nome = 'Vanessa'

  const url = "https://via.placeholder.com/150"

  return (
    <BrowserRouter>
      <AppRoutes />
      <Footer />
      {/*   Conteudo aula 2 */}
      <div className='teste color'>
        <p>Olá, {nome}</p>
        <img src={url} alt="MinhaImg" />
        <Frase />
      </div>

      <div className='teste'>
        <SayMyName nome = {nome}/>
      </div>
      </BrowserRouter>
  );
}

export default App;
