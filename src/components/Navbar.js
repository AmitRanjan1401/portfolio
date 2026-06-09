import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection('home')}>
            <span className="logo-icon">
              <img src="/images/about4.png" alt="AR" className="logo-img" />
            </span>
            <span className="logo-text">Amit Ranjan</span>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a onClick={() => scrollToSection('home')}>Home</a>
            <a onClick={() => scrollToSection('projects')}>Projects</a>
            <a onClick={() => scrollToSection('skills')}>Skills</a>
            <a onClick={() => scrollToSection('contact')}>Contact</a>
          </div>

          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;