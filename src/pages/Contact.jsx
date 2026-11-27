import React, { useState } from "react";
import "../styles/contact.css";
import {
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPaperPlane,
  FaShieldAlt,
  FaBolt
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        <div style={{ textAlign: "center" }}>
          <div className="contact-header-badge">
            <FaBolt /> Direct Comms Terminal
          </div>
          <h1 className="contact-title">📬 Get In Touch</h1>
          <p className="contact-subtitle">
            Interested in discussing Senior Java / Distributed Systems engineering roles, system architecture, or consulting? Connect directly through verified channels.
          </p>
        </div>

        {/* Location & Specialization Banner */}
        <div className="contact-status-card">
          <div className="status-item">
            <FaMapMarkerAlt className="status-icon" />
            <div>
              <strong>Current Location</strong>
              <p>Indore, India (Open to Relocate)</p>
            </div>
          </div>
          <div className="status-item">
            <FaCheckCircle className="status-icon" style={{ color: "#10b981" }} />
            <div>
              <strong>Specialization</strong>
              <p>Distributed Systems & Kafka</p>
            </div>
          </div>
          <div className="status-item">
            <FaShieldAlt className="status-icon" style={{ color: "#818cf8" }} />
            <div>
              <strong>Target Roles</strong>
              <p>Senior Java / Backend Engineer</p>
            </div>
          </div>
        </div>

        <div className="contact-grid">
          {/* Contact Details Column */}
          <div className="contact-info-panel">
            <h2>Direct Coordinates</h2>
            <p>Direct priority coordinates for recruiting, technical interviews, and engineering architecture discussions:</p>

            <div className="contact-channel">
              <FaLinkedin className="channel-icon" />
              <div>
                <strong>LinkedIn</strong>
                <a
                  href="https://www.linkedin.com/in/durgashankar-patra-b2092120b/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/durgashankar-patra-b2092120b/
                </a>
              </div>
            </div>

            <div className="contact-channel">
              <FaEnvelope className="channel-icon" />
              <div>
                <strong>Email</strong>
                <a href="mailto:durgashankarpatra457@gmail.com">
                  durgashankarpatra457@gmail.com
                </a>
              </div>
            </div>

            <div className="availability-notice">
              <div className="availability-dot"></div>
              <span>Immediate Notice Period Available • Relocation Ready</span>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-panel">
            <h2>Send A Quick Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe (Tech Lead / Recruiter)"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Message / Opportunity Details</label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Share details regarding the role, tech stack, or meeting schedule..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-contact-submit">
                <FaPaperPlane /> Send Transmission
              </button>

              {submitted && (
                <div className="submit-success-banner">
                  <FaCheckCircle style={{ color: "#10b981", fontSize: "1.2rem" }} />
                  <span>Thank you! Your message has been dispatched. I will reply within 24 hours.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
