import './app.css';

import { BrowserRouter } from 'react-router-dom';

import Frase from './componentes/frases';
import SayMyName from './componentes/sayMyName';
import Pessoa from './componentes/pessoa';
import List from './componentes/list';

function App() {
  const nome = 'Vanessa'
  const url = "https://via.placeholder.com/150"

  return (
    <BrowserRouter>
     {/*  <AppRoutes />
      <Footer /> */}
      {/*   Conteudo aula 2 */}
      <div className='teste color'>
        <p>Olá, {nome}</p>
        <img src={url} alt="MinhaImg" />
        <Frase />
      </div>

      <div className='teste'>
        <SayMyName nome = {nome}/>
        <Pessoa nome = "Vanessa" idade = {20} prof = "secretaria" foto= "https://via.placeholder.com/100" />
      
        <List/>
      </div>
      </BrowserRouter>
  );
}

export default App;
