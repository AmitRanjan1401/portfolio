import React, { useState, useRef, useEffect } from 'react';
import './Skills.css';

const skillsData = [
  { name: 'React.js',          level: 90, icon: '⚛️', color: '#61dafb' },
  { name: 'JavaScript ES6+',   level: 88, icon: '🟡', color: '#f7df1e' },
  { name: 'HTML5 / CSS3',      level: 92, icon: '🎨', color: '#e34f26' },
  { name: 'Tailwind CSS',      level: 85, icon: '🌊', color: '#38bdf8' },
  { name: 'Node.js',           level: 78, icon: '🟢', color: '#68a063' },
  { name: 'Git & GitHub',      level: 82, icon: '📦', color: '#f34f29' },
  { name: 'Figma',             level: 75, icon: '🎯', color: '#f24e1e' },
  { name: 'Redux',             level: 80, icon: '🔄', color: '#764abc' },
];

/* Circular SVG progress ring */
const CircleProgress = ({ level, color, animate }) => {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (animate ? (level / 100) * circ : circ);

  return (
    <svg width="88" height="88" viewBox="0 0 88 88" className="circle-svg">
      {/* Background ring */}
      <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
      {/* Glow filter */}
      <defs>
        <filter id={`glow-${color.replace('#','')}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Progress arc */}
      <circle
        cx="44" cy="44" r={r}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 44 44)"
        filter={`url(#glow-${color.replace('#','')})`}
        style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.23,1,0.32,1)' }}
      />
      <text x="44" y="49" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">
        {animate ? `${level}%` : '0%'}
      </text>
    </svg>
  );
};

/* Individual skill card with 3D tilt */
const SkillCard = ({ skill, index, visible }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotate({
      x: ((y - rect.height / 2) / rect.height) * -18,
      y: ((x - rect.width  / 2) / rect.width)  *  18,
    });
  };

  const onLeave = () => { setRotate({ x: 0, y: 0 }); setHovered(false); };

  return (
    <div
      ref={cardRef}
      className={`skill-card ${hovered ? 'hovered' : ''}`}
      style={{
        animationDelay: `${index * 0.08}s`,
        transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${hovered ? 'scale(1.06)' : 'scale(1)'}`,
        transition: hovered ? 'transform 0.08s ease' : 'transform 0.5s ease',
        '--skill-color': skill.color,
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
    >
      {/* Shine */}
      <div className="skill-shine" style={{
        background: hovered
          ? `radial-gradient(circle at ${rotate.y / 18 * 50 + 50}% ${-rotate.x / 18 * 50 + 50}%, rgba(255,255,255,0.13) 0%, transparent 65%)`
          : 'none'
      }} />

      {/* Left color bar */}
      <div className="skill-side-bar" style={{ background: skill.color }} />

      <div className="skill-body">
        {/* Circle progress */}
        <div className="skill-circle">
          <CircleProgress level={skill.level} color={skill.color} animate={visible} />
          <span className="skill-icon-badge">{skill.icon}</span>
        </div>

        {/* Info */}
        <div className="skill-info">
          <h4 className="skill-name">{skill.name}</h4>

          {/* Linear bar */}
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: visible ? `${skill.level}%` : '0%',
                background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})`,
                boxShadow: `0 0 10px ${skill.color}88`,
              }}
            />
          </div>

          {/* Level label */}
          <span className="skill-level-label" style={{ color: skill.color }}>
            {skill.level >= 88 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
          </span>
        </div>
      </div>

      {/* Glow backdrop */}
      <div className="skill-glow" style={{ background: `radial-gradient(circle at 50% 100%, ${skill.color}22 0%, transparent 70%)` }} />
    </div>
  );
};

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">My Expertise</span>
          <h2>Technical <span className="gradient-text">Skills</span></h2>
          <p>Constantly learning and improving my craft</p>
        </div>

        <div className="skills-grid">
          {skillsData.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} visible={visible} />
          ))}
        </div>

        {/* Quote card */}
        <div className="skills-quote">
          <div className="quote-particles">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="q-particle" style={{ '--i': i }} />
            ))}
          </div>
          <div className="quote-icon">💡</div>
          <p>"Code is like poetry. It should be clean, expressive, and beautiful."</p>
          <span className="quote-author">— Clean Code Philosophy</span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
