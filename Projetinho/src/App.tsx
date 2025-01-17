import './style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Company from './components/Company';
import Contact from './components/Contact';
import NewProject from './components/NewProject';
import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Projects from './pages/Projects';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
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
