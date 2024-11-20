import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Footer } from "./componentes/footer";
import { NavBar } from "./componentes/navBar"; 
import { Section } from "./componentes/section";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/login"
        element={<> 
          <NavBar/>
          <Section/>
          <Footer/>
        </>}>
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
