import './style.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Company from './components/company';
import Contact from './components/contact';
import Home from './components/home';
import NewProject from './components/newproject';
import Container from './components/layout/container';
import Footer from './components/footer';
import NavBar from './components/layout/navBar';
import Projects from './pages/projects';


function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass='min-height'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path = "/projects" element = {<Projects/>}/>
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
