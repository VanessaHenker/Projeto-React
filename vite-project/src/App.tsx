import { Footer } from "./componentes/footer";
import { NavBar } from "./componentes/navBar"; 
import { Section } from "./componentes/section";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <NavBar />
              <Section />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
