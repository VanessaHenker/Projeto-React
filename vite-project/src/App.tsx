import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from './pages/login';
import { Home } from './pages/home';
import { Footer } from './componentes/footer';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"
          element={<Login/>}>
        </Route>
        
        <Route path="/home"
          element={<Home/>}>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
