import { BrowserRouter } from 'react-router-dom';
import { Footer } from './componentes/footer';
import { AppRoutes } from './routes';


function App() {
  const name = 'Vanessa'

  const url = "https://via.placeholder.com/150"

  return (
    <BrowserRouter>
      <AppRoutes />
      <Footer />

    {/*   Conteudo aula 2 */}
    <div className='app'>
      <p className= 'teste'>Olá, {name}</p>
      <img src={url} alt="MinhaImg" />
    </div>
    </BrowserRouter>
  );
}

export default App;
