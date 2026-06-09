import React, { useState, useRef } from 'react';
import './Projects.css';

const projectsData = [
  // ── React (6) ──
  {
    id: 1,
    title: 'AI Image Generator',
    category: 'React',
    description: 'Generate stunning AI-powered images using DALL-E API with real-time preview',
    tech: ['React', 'OpenAI API', 'Tailwind CSS'],
    icon: '🎨',
    color: '#6366f1'
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'React',
    description: 'Full-featured e-commerce with cart, checkout, and Stripe payment integration',
    tech: ['React', 'Redux', 'Stripe', 'REST API'],
    icon: '🛒',
    color: '#f59e0b'
  },
  {
    id: 3,
    title: 'Portfolio Builder',
    category: 'React',
    description: 'Drag-and-drop portfolio builder with live preview and export feature',
    tech: ['React', 'DnD Kit', 'Tailwind CSS'],
    icon: '🖼️',
    color: '#a855f7'
  },
  {
    id: 4,
    title: 'Movie Explorer',
    category: 'React',
    description: 'Browse and search movies with TMDB API, ratings, and watchlist feature',
    tech: ['React', 'TMDB API', 'Context API'],
    icon: '🎬',
    color: '#ec4899'
  },
  {
    id: 5,
    title: 'Quiz Master',
    category: 'React',
    description: 'Interactive quiz app with timer, score tracking, and multiple categories',
    tech: ['React', 'Open Trivia API', 'CSS Modules'],
    icon: '🧠',
    color: '#06b6d4'
  },
  {
    id: 6,
    title: 'Recipe Finder',
    category: 'React',
    description: 'Search and save recipes with ingredients filter and nutritional info',
    tech: ['React', 'Spoonacular API', 'LocalStorage'],
    icon: '🍕',
    color: '#10b981'
  },

  // ── Full Stack (6) ──
  {
    id: 7,
    title: 'Crypto Dashboard',
    category: 'Full Stack',
    description: 'Real-time cryptocurrency tracking with interactive charts and portfolio management',
    tech: ['React', 'Node.js', 'Chart.js', 'WebSocket'],
    icon: '💰',
    color: '#a855f7'
  },
  {
    id: 8,
    title: 'Social Media Dashboard',
    category: 'Full Stack',
    description: 'Analytics dashboard for social media metrics with real-time updates',
    tech: ['React', 'Firebase', 'Chart.js'],
    icon: '📊',
    color: '#10b981'
  },
  {
    id: 9,
    title: 'Blog Platform',
    category: 'Full Stack',
    description: 'Full-featured blog with markdown editor, comments, and user authentication',
    tech: ['React', 'Node.js', 'MongoDB', 'JWT'],
    icon: '✍️',
    color: '#f59e0b'
  },
  {
    id: 10,
    title: 'Chat Application',
    category: 'Full Stack',
    description: 'Real-time chat app with rooms, emoji reactions, and file sharing',
    tech: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    icon: '💬',
    color: '#6366f1'
  },
  {
    id: 11,
    title: 'Job Board',
    category: 'Full Stack',
    description: 'Job listing platform with filters, applications tracking, and employer dashboard',
    tech: ['React', 'Express', 'PostgreSQL', 'Cloudinary'],
    icon: '💼',
    color: '#ec4899'
  },
  {
    id: 12,
    title: 'Food Delivery App',
    category: 'Full Stack',
    description: 'Online food ordering with real-time order tracking and payment gateway',
    tech: ['React', 'Node.js', 'Stripe', 'Redis'],
    icon: '🍔',
    color: '#06b6d4'
  },

  // ── Productivity (6) ──
  {
    id: 13,
    title: 'TaskFlow Pro',
    category: 'Productivity',
    description: 'Beautiful task management app with drag-drop, dark mode, and local storage',
    tech: ['React', 'Framer Motion', 'LocalStorage'],
    icon: '✅',
    color: '#ec4899'
  },
  {
    id: 14,
    title: 'Pomodoro Timer',
    category: 'Productivity',
    description: 'Focus timer with sessions, breaks, task list, and sound notifications',
    tech: ['React', 'Web Audio API', 'LocalStorage'],
    icon: '⏱️',
    color: '#f59e0b'
  },
  {
    id: 15,
    title: 'Note Taking App',
    category: 'Productivity',
    description: 'Rich text note app with tags, search, pin notes, and cloud sync',
    tech: ['React', 'Quill.js', 'Firebase'],
    icon: '📝',
    color: '#6366f1'
  },
  {
    id: 16,
    title: 'Habit Tracker',
    category: 'Productivity',
    description: 'Daily habit tracking with streaks, progress charts, and reminders',
    tech: ['React', 'Chart.js', 'LocalStorage'],
    icon: '🏆',
    color: '#10b981'
  },
  {
    id: 17,
    title: 'Budget Planner',
    category: 'Productivity',
    description: 'Personal finance manager with expense tracking and visual reports',
    tech: ['React', 'Chart.js', 'IndexedDB'],
    icon: '💸',
    color: '#a855f7'
  },
  {
    id: 18,
    title: 'Kanban Board',
    category: 'Productivity',
    description: 'Project management board with drag-drop cards, labels, and deadlines',
    tech: ['React', 'DnD Kit', 'Zustand'],
    icon: '📋',
    color: '#06b6d4'
  },

  // ── API (6) ──
  {
    id: 19,
    title: 'WeatherWise',
    category: 'API',
    description: 'Elegant weather app with animated backgrounds and 5-day forecast',
    tech: ['React', 'Weather API', 'Geolocation'],
    icon: '🌤️',
    color: '#06b6d4'
  },
  {
    id: 20,
    title: 'News Aggregator',
    category: 'API',
    description: 'Personalized news feed from multiple sources with category filters',
    tech: ['React', 'NewsAPI', 'Axios'],
    icon: '📰',
    color: '#6366f1'
  },
  {
    id: 21,
    title: 'GitHub Explorer',
    category: 'API',
    description: 'Search GitHub users and repos with stars, forks, and contribution graph',
    tech: ['React', 'GitHub API', 'D3.js'],
    icon: '🐙',
    color: '#e0e0e0'
  },
  {
    id: 22,
    title: 'Currency Converter',
    category: 'API',
    description: 'Live currency conversion with historical rates and interactive chart',
    tech: ['React', 'Exchange Rate API', 'Chart.js'],
    icon: '💱',
    color: '#10b981'
  },
  {
    id: 23,
    title: 'Space Explorer',
    category: 'API',
    description: 'NASA APOD gallery, Mars rover photos, and ISS live location tracker',
    tech: ['React', 'NASA API', 'Leaflet.js'],
    icon: '🚀',
    color: '#a855f7'
  },
  {
    id: 24,
    title: 'Language Translator',
    category: 'API',
    description: 'Multi-language text translation with speech-to-text and text-to-speech',
    tech: ['React', 'Google Translate API', 'Web Speech API'],
    icon: '🌍',
    color: '#ec4899'
  },
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      className="card-3d-wrapper"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        ref={cardRef}
        className={`project-card ${isHovered ? 'hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovered ? 'scale(1.04)' : 'scale(1)'}`,
          transition: isHovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
          '--card-color': project.color,
        }}
      >
        {/* Shine overlay */}
        <div
          className="card-shine"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${
                  ((rotate.y / 12) * 50 + 50)}% ${((-rotate.x / 12) * 50 + 50)}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
              : 'none',
          }}
        />

        {/* Top glow bar */}
        <div className="card-top-bar" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}88)` }} />

        <div className="project-icon" style={{ background: `${project.color}18` }}>
          <span className="icon-emoji">{project.icon}</span>
          <div className="icon-ring" style={{ borderColor: `${project.color}44` }} />
        </div>

        <div className="project-details">
          <span className="project-category" style={{ color: project.color, background: `${project.color}18`, borderColor: `${project.color}44` }}>
            {project.category}
          </span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tech-stack">
            {project.tech.map(tech => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
          <div className="project-actions">
            <a href="#" className="demo-link">
              <span>Live Demo</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#" className="code-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.6-4.04-1.6-.55-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.06 1.82 2.8 1.3 3.48.99.1-.77.41-1.3.75-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* 3D depth shadow */}
        <div className="card-depth-shadow" style={{ boxShadow: isHovered ? `0 30px 60px ${project.color}33` : 'none' }} />
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'React', 'Full Stack', 'Productivity', 'API'];

  const filteredProjects = filter === 'All'
    ? [
        ...projectsData.filter(p => p.category === 'React').slice(0, 2),
        ...projectsData.filter(p => p.category === 'Full Stack').slice(0, 2),
        ...projectsData.filter(p => p.category === 'Productivity').slice(0, 1),
        ...projectsData.filter(p => p.category === 'API').slice(0, 1),
      ]
    : projectsData.filter(p => p.category === filter);

  return (
    <section className="projects" id="projects">
      {/* BG orbs */}
      <div className="proj-orb proj-orb-a" />
      <div className="proj-orb proj-orb-b" />

      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <span className="tag-dot" />My Portfolio
          </span>
          <h2 className="header-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="header-sub">Each project is crafted with passion and modern technology</p>
          <div className="header-line">
            <span className="line-dot" />
            <span className="line-bar" />
            <span className="line-dot" />
          </div>
        </div>

        <div className="filter-container">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => setFilter(cat)}
            >
              {filter === cat && <span className="btn-glow" />}
              <span className="btn-label">{cat}</span>
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
