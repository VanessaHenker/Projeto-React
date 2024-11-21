import { BrowserRouter} from 'react-router-dom';
import { Footer } from './componentes/footer';
import { AppRoutes } from './routes';


function App() {
  const name = 'Vanessa'

  return (
    <BrowserRouter>
      <AppRoutes/>
      <Footer/>

      <p>Olá, {name}</p>
    </BrowserRouter>
  );
}

export default App;
