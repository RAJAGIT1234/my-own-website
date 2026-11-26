import React from "react";
import "../styles/components.css";
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Durgashankar Patra</h3>
          <p>Senior Java Software Engineer • Microservices, Distributed Systems & AI-Driven Engineering</p>
        </div>
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/durgashankarpatra-java-developer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin style={{ marginRight: 6 }} /> LinkedIn
          </a>
          <a href="mailto:durgashankarpatra380@gmail.com">
            <FaEnvelope style={{ marginRight: 6 }} /> Email
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Durgashankar Patra. Built with React & Vite. All rights reserved.</p>
      </div>
    </footer>
  );
}
