import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from './pages/login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/login"
        element={<Login/>}>
      </Route>
        
      <Route path="/home"
        element={<> 
          <h2>Home</h2>
        </>}>
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
