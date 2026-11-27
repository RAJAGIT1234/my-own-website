import React, { useContext } from "react";
import "../styles/dashboard.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaProjectDiagram,
  FaBlog,
  FaUsers,
  FaBriefcase,
  FaGraduationCap,
  FaUserCircle,
  FaMapMarkerAlt,
  FaBolt,
  FaServer,
  FaChartLine,
  FaShieldAlt,
  FaLinkedin,
  FaDownload,
  FaEnvelope
} from "react-icons/fa";

export default function Dashboard() {
  const { visitor } = useContext(AuthContext);
  const visitorName = visitor?.name || "Valued Recruiter";
  const visitorRole = visitor?.role || "Recruiter / Hiring Manager";
  const visitorCompany = visitor?.company ? `from ${visitor.company}` : "";

  const keyStats = [
    { label: "Enterprise Experience", value: "4.5+ Yrs", icon: <FaBriefcase />, color: "#818cf8" },
    { label: "Production Peak Load", value: "8,000+ RPS", icon: <FaBolt />, color: "#f59e0b" },
    { label: "System Availability", value: "99.99%", icon: <FaServer />, color: "#10b981" },
    { label: "p99 API Latency", value: "420ms ➔ 75ms", icon: <FaChartLine />, color: "#38bdf8" },
    { label: "Daily Kafka Messages", value: "2M+", icon: <FaProjectDiagram />, color: "#ec4899" },
    { label: "Code Quality Gates", value: "100% OWASP", icon: <FaShieldAlt />, color: "#a855f7" },
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-badge">🎫 Recruiter & Visitor Access Active</div>
        <h1>
          Welcome, <span className="username">{visitorName}</span> 👋
        </h1>
        <p className="dashboard-visitor-sub">
          Visiting as <strong>{visitorRole}</strong> {visitorCompany} • Executive candidate evaluation portal for <strong>Durgashankar Patra</strong>.
        </p>

        {/* Quick Recruiter Direct Actions */}
        <div className="recruiter-quick-actions">
          <a
            href="https://www.linkedin.com/in/durgashankar-patra-b2092120b/"
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn email-btn"
          >
            <FaLinkedin style={{ marginRight: 8, fontSize: "1.1rem", color: "#38bdf8" }} /> Connect on LinkedIn
          </a>
          <a
            href="/resume.pdf"
            download="Durgashankar_Patra_Resume.pdf"
            className="action-btn download-btn"
          >
            <FaDownload style={{ marginRight: 8 }} /> Download Resume
          </a>
          <a
            href="mailto:durgashankarpatra457@gmail.com"
            className="action-btn email-btn"
          >
            <FaEnvelope style={{ marginRight: 8 }} /> Email Directly
          </a>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats-section">
        <h2 className="dash-section-title">📊 Architectural Production Impact</h2>
        <div className="stats-grid">
          {keyStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="links-section">
        <h2 className="dash-section-title">⚡ Candidate Dossier Portals</h2>
        <div className="links-grid">
          <Link to="/experience" className="link-card">
            <FaBriefcase className="link-icon" />
            <h3>Work Experience</h3>
            <p>Advantal Technologies (Sr. Engineer) & GluedIn production history</p>
          </Link>

          <Link to="/profile" className="link-card">
            <FaUserCircle className="link-icon" />
            <h3>Profile Summary</h3>
            <p>Executive biography, contact info, relocation status & core skills</p>
          </Link>

          <Link to="/education" className="link-card">
            <FaGraduationCap className="link-icon" />
            <h3>Education & Degrees</h3>
            <p>B.Tech Computer Science & Engineering (BPUT)</p>
          </Link>

          <Link to="/address" className="link-card">
            <FaMapMarkerAlt className="link-icon" />
            <h3>Location & Address</h3>
            <p>Indore (Open to relocate) & Balasore permanent address</p>
          </Link>

          <Link to="/projects" className="link-card">
            <FaProjectDiagram className="link-icon" />
            <h3>Projects Manager</h3>
            <p>Track microservice engines and connectors built from scratch</p>
          </Link>

          <Link to="/contact" className="link-card">
            <FaEnvelope className="link-icon" />
            <h3>Contact Terminal</h3>
            <p>Send direct inquiry or schedule technical discussion</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
