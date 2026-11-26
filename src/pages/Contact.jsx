import React, { useState } from "react";
import "../styles/contact.css";
import {
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPaperPlane
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
        <h1 className="contact-title fade-in">📬 Get In Touch</h1>
        <p className="contact-subtitle fade-in delay-1">
          Interested in discussing Senior Java / Distributed Systems engineering roles, system architecture, or consulting? Feel free to reach out directly.
        </p>

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
            <FaCheckCircle className="status-icon" style={{ color: "#4f46e5" }} />
            <div>
              <strong>Preferred Roles</strong>
              <p>Senior Java / Backend Engineer</p>
            </div>
          </div>
        </div>

        <div className="contact-grid">
          {/* Contact Details Column */}
          <div className="contact-info-panel">
            <h2>Direct Coordinates</h2>
            <p>Connect through any of the channels below:</p>

            <div className="contact-channel">
              <FaLinkedin className="channel-icon" />
              <div>
                <strong>LinkedIn</strong>
                <a
                  href="https://www.linkedin.com/in/durgashankarpatra-java-developer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/durgashankarpatra-java-developer
                </a>
              </div>
            </div>

            <div className="contact-channel">
              <FaEnvelope className="channel-icon" />
              <div>
                <strong>Email</strong>
                <a href="mailto:durgashankarpatra380@gmail.com">
                  durgashankarpatra380@gmail.com
                </a>
              </div>
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
                  placeholder="e.g. Hiring Manager / Tech Lead"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Message / Job Brief</label>
                <textarea
                  name="message"
                  placeholder="Share details about the role, project, or schedule a conversation..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                <FaPaperPlane style={{ marginRight: 8 }} /> Send Message
              </button>

              {submitted && (
                <div className="success-banner">
                  ✅ Thank you! Message registered successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
