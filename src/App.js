import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';  // ← ADD THIS IMPORT
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return null;

  return (
    <div className="app">
      {/* Animated Background Elements */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
      
      {/* Navbar - NOW AT THE TOP */}
      <Navbar />  {/* ← ADD THIS */}
      
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 React Developer | Built with React & Modern CSS</p>

        </div>
      </footer>
    </div>
  );
}

export default App;