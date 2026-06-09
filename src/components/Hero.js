import React from 'react';
import './Hero.css';

const Hero = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5  && hour < 12) return 'Good Morning ☀️';
    if (hour >= 12 && hour < 17) return 'Good Afternoon 🌤️';
    if (hour >= 17 && hour < 21) return 'Good Evening 🌇';
    return 'Good Night 🌙';
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-greeting">
            <span className="wave">👋</span>
            <span>Hello, I'm AMIT RANJAN — {getGreeting()}</span>
          </div>
          
          <h1 className="hero-title">
            Creative 
            <span className="gradient-text"> React Developer</span>
          </h1>
          
          <p className="hero-description">
            I craft beautiful, responsive, and high-performance web applications 
            with modern React and stunning animations. Let's bring your ideas to life!
          </p>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={scrollToProjects}>
              View My Work 
              <i className="fas fa-arrow-right"></i>
            </button>
            <button className="btn-secondary" onClick={scrollToContact}>
              Let's Connect
              <i className="fas fa-comment"></i>
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat">
              <div className="stat-number">20+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          {/* Profile Image */}
          <div className="hero-image-wrapper">
            <img src="/images/bg_1.png" alt="Amit Ranjan" className="hero-profile-img" />
            <div className="hero-image-glow"></div>
          </div>

          {/* Code Card */}
          <div className="code-card">
            <div className="card-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="card-code">
              <code>
                <span className="keyword">const</span> developer = {"{"}<br/>
                &nbsp;&nbsp;name: <span className="string">'React Dev'</span>,<br/>
                &nbsp;&nbsp;skills: [<span className="string">'React'</span>, <span className="string">'UI/UX'</span>],<br/>
                &nbsp;&nbsp;passion: <span className="string">'Creating Magic'</span><br/>
                {"}"};
              </code>
            </div>
          </div>
          
          {/* Floating Icons */}
          <div className="floating-icons">
            <div className="icon icon-1">
              <i className="fab fa-react"></i>
            </div>
            <div className="icon icon-2">
              <i className="fab fa-js"></i>
            </div>
            <div className="icon icon-3">
              <i className="fab fa-css3-alt"></i>
            </div>
            <div className="icon icon-4">
              <i className="fab fa-figma"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default Hero;
