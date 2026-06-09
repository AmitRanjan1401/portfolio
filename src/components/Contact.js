import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const EMAILJS_SERVICE_ID  = 'service_x9dskjc';
const EMAILJS_TEMPLATE_ID = 'template_urcx8dt';
const EMAILJS_PUBLIC_KEY  = 'C6Cc0AOsUuATr4qbU';

const contactInfo = [
  { icon: '📧', label: 'Email',    value: 'amitranjan142003@gmail.com', link: 'mailto:amitranjan142003@gmail.com', color: '#6366f1' },
  { icon: '📱', label: 'Phone',    value: '+91 6206855548',              link: 'tel:+916206855548',                color: '#a855f7' },
  { icon: '📍', label: 'Location', value: 'Darbhanga, Bihar',           link: 'https://maps.google.com/?q=Darbhanga,+Bihar', color: '#ec4899' },
  { icon: '🌐', label: 'Social',   value: '@amitranjan142003',          link: 'https://twitter.com/amitranjan142003', color: '#06b6d4' },
];

const socialLinks = [
  { icon: 'fab fa-github',     href: '#', color: '#e0e0ff' },
  { icon: 'fab fa-linkedin-in',href: '#', color: '#0a66c2' },
  { icon: 'fab fa-twitter',    href: '#', color: '#1d9bf0' },
  { icon: 'fab fa-instagram',  href: '#', color: '#e1306c' },
];

/* 3D tilt info card */
const InfoCard = ({ info, index }) => {
  const ref = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - r.top  - r.height / 2) / r.height) * -14,
      y: ((e.clientX - r.left - r.width  / 2) / r.width)  *  14,
    });
  };

  return (
    <div
      ref={ref}
      className={`info-item ${hovered ? 'hovered' : ''}`}
      style={{
        '--info-color': info.color,
        animationDelay: `${index * 0.1}s`,
        transform: `perspective(700px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) ${hovered ? 'scale(1.04)' : 'scale(1)'}`,
        transition: hovered ? 'transform 0.08s ease' : 'transform 0.5s ease',
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setRot({ x: 0, y: 0 }); setHovered(false); }}
    >
      {/* Shine */}
      <div className="info-shine" style={{
        background: hovered
          ? `radial-gradient(circle at ${rot.y / 14 * 50 + 50}% ${-rot.x / 14 * 50 + 50}%, rgba(255,255,255,0.12) 0%, transparent 65%)`
          : 'none'
      }} />
      <div className="info-left-bar" style={{ background: info.color }} />
      <div className="info-icon-wrap" style={{ background: `${info.color}18`, borderColor: `${info.color}33` }}>
        <span className="info-icon">{info.icon}</span>
      </div>
      <div className="info-details">
        <span className="info-label" style={{ color: info.color }}>{info.label}</span>
        <a href={info.link} className="info-value" target="_blank" rel="noreferrer">{info.value}</a>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData]   = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading]     = useState(false);
  const [focused, setFocused]         = useState('');
  const [errors, setErrors]           = useState({});

  const validate = (name, value) => {
    if (name === 'name'    && value.length < 2)  return 'Name must be at least 2 characters';
    if (name === 'email'   && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
    if (name === 'message' && value.length < 10) return 'Message must be at least 10 characters';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validate(name, value) });
    setFocused('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name:    validate('name',    formData.name),
      email:   validate('email',   formData.email),
      message: validate('message', formData.message),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    setIsLoading(true);

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:  formData.name,
        from_email: formData.email,
        message:    formData.message,
      },
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setIsSubmitted(false), 4000);
    })
    .catch(() => {
      setIsLoading(false);
      setErrors({ submit: 'Failed to send. Please try again.' });
    });
  };

  return (
    <section className="contact" id="contact">
      {/* Background floating orbs */}
      <div className="contact-orb orb-a" />
      <div className="contact-orb orb-b" />

      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get In Touch</span>
          <h2>Let's Work <span className="gradient-text">Together</span></h2>
          <p>Have a project in mind? I'd love to hear about it</p>
        </div>

        <div className="contact-wrapper">

          {/* ── LEFT: Info ── */}
          <div className="contact-info">
            <h3>Let's Talk 🚀</h3>
            <p>I'm currently available for freelance work and collaborations.</p>

            <div className="info-list">
              {contactInfo.map((info, i) => (
                <InfoCard key={i} info={info} index={i} />
              ))}
            </div>

            <div className="social-connect">
              <span>Connect with me:</span>
              <div className="social-icons">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="social-icon"
                    style={{ '--s-color': s.color }}
                  >
                    <i className={s.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="form-card">
            <div className="form-card-top-bar" />
            <form className="contact-form" onSubmit={handleSubmit}>

              {[
                { name: 'name',  type: 'text',  placeholder: 'Your Name',  icon: '👤' },
                { name: 'email', type: 'email', placeholder: 'Your Email', icon: '✉️' },
              ].map((field) => (
                <div key={field.name} className={`form-group ${
                  focused === field.name ? 'focused' : ''} ${
                  errors[field.name] ? 'has-error' : ''} ${
                  !errors[field.name] && formData[field.name] ? 'has-value' : ''
                }`}>
                  <span className="field-icon">{field.icon}</span>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocused(field.name)}
                    onBlur={handleBlur}
                    required
                  />
                  {!errors[field.name] && formData[field.name] && (
                    <span className="field-check">✓</span>
                  )}
                  {errors[field.name] && (
                    <span className="field-error-icon">!</span>
                  )}
                  {errors[field.name] && (
                    <p className="field-error-msg">{errors[field.name]}</p>
                  )}
                </div>
              ))}

              <div className={`form-group textarea-group ${
                focused === 'message' ? 'focused' : ''} ${
                errors.message ? 'has-error' : ''} ${
                !errors.message && formData.message ? 'has-value' : ''
              }`}>
                <span className="field-icon top">💬</span>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={handleBlur}
                  required
                />
                <span className="char-count">{formData.message.length}/500</span>
                {errors.message && (
                  <p className="field-error-msg">{errors.message}</p>
                )}
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <><span className="spinner" /> Sending...</>
                ) : (
                  <>Send Message <i className="fas fa-paper-plane" /></>
                )}
                <span className="btn-ripple" />
              </button>

              {isSubmitted && (
                <div className="success-message">
                  <span>✅</span> Message sent! I'll get back to you soon.
                </div>
              )}

              {errors.submit && (
                <div className="error-message">
                  <span>❌</span> {errors.submit}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
