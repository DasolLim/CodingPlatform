// Main
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ChallengeList from './pages/ChallengeList';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProblemPage from './pages/ProblemPage'; // Import ProblemPage

// Main layout wrapper (if needed)
function MainLayout({ children }) {
  return <div className="main-layout">{children}</div>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Wrap the Home route with MainLayout */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/challenges" element={<ChallengeList />} />
          <Route path="/problem/:id" element={<ProblemPage />} /> {/* Dynamic route for specific problems */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
