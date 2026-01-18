import TestBackend from './firebase/TestBackend';
import LoginTest from './firebase/LoginTest';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './publicSite/components/Navbar';
import Footer from './publicSite/components/Footer';
import Home from './publicSite/pages/Home';
import About from './publicSite/pages/About';
import Events from './publicSite/pages/Events';
import Members from './publicSite/pages/Members';
import Projects from './publicSite/pages/Projects';
import Gallery from './publicSite/pages/Gallery';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/members" element={<Members />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
