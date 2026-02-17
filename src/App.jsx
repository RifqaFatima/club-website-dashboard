import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './publicSite/components/navbar';
import Footer from './publicSite/components/Footer';
import Home from './publicSite/pages/Home';
import About from './publicSite/pages/About';
import Events from './publicSite/pages/Events';
import Members from './publicSite/pages/Members';
import Projects from './publicSite/pages/Projects';
import Gallery from './publicSite/pages/Gallery';
//import ChangePassword from './auth/ChangePassword';
import Login from './auth/Login';
import MemberDashboard from './memberDashboard/pages/memberDashboard';
import ProjectTimeline from './memberDashboard/pages/ProjectTimeline';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePassword from "./auth/ChangePassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/members" element={<Members />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/login" element={<Login />} />
            
              {/* Protected Route */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <MemberDashboard />
                  </ProtectedRoute>
                } 
              />
<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>

              <Route
                path="/dashboard/projects"
                element={
                  <ProtectedRoute>
                    <ProjectTimeline />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;