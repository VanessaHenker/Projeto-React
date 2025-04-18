import './style.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Company from './components/company';
import Container from './components/layout/container';
import NavBar from './components/layout/navBar';
import Projects from './pages/projects';
import Footer from './components/footer';
import Home from './components/home';
import Contact from './components/contact';

import ProjectOne from './pages/projectOne';
import NewProject from './pages/Newproject';

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass='min-height'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject/>} />
          <Route path="/projectOne/:id" element={<ProjectOne />} />
          <ProjectOne/>
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
