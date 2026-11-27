import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaFileAlt, FaTerminal } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Live System Operational Status */}
        <div className="footer-status-line">
          <span className="footer-dot-pulse"></span>
          <span>ALL DISTRIBUTED SYSTEMS OPERATIONAL • 99.99% SYSTEM UPTIME</span>
        </div>

        <div className="footer-brand">
          <h3 style={{ margin: "0 0 6px", color: "#ffffff", fontSize: "1.1rem", fontWeight: 800 }}>
            Durgashankar Patra
          </h3>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.85rem" }}>
            Senior Java Software Engineer • Microservices, Apache Kafka, Redis & AI-Augmented SDLC
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links-row">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/projects" className="footer-link">Projects</Link>
          <Link to="/resume" className="footer-link">Resume (PDF)</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <a
            href="https://www.linkedin.com/in/durgashankar-patra-b2092120b/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaLinkedin style={{ marginRight: 4, color: "#38bdf8" }} /> LinkedIn
          </a>
          <a href="mailto:durgashankarpatra457@gmail.com" className="footer-link">
            <FaEnvelope style={{ marginRight: 4, color: "#facc15" }} /> Email
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Durgashankar Patra. Engineered with React 18, Vite & 4K Cybernetic Architecture. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
