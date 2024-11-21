import { BrowserRouter } from 'react-router-dom';
import { Footer } from './componentes/footer';
import { AppRoutes } from './routes';


function App() {
  const name = 'Vanessa'

  function soma(a, b) {
    return a + b
  }

  const url = "https://via.placeholder.com/150"

  return (
    <BrowserRouter>
      <AppRoutes />
      <Footer />

    {/*   Conteudo aula 2 */}
      <p>Olá, {name}</p>
      <p>Soma: {soma(1, 2)}</p>
      <img src={url} alt="MinhaImg" />
    </BrowserRouter>
  );
}

export default App;
