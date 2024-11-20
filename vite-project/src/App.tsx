import { BrowserRouter} from 'react-router-dom';
import { Footer } from './componentes/footer';
import { AppRoutes } from './routes';


function App() {
  return (
    <BrowserRouter>
      <AppRoutes/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
