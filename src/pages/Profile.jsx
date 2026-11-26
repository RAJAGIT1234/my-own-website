import React from "react";
import "../styles/Profile.css";
import {
  FaUserTie,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaBriefcase,
  FaAward
} from "react-icons/fa";

export default function Profile() {
  const profile = {
    name: "Durgashankar Patra",
    role: "Senior Java Software Engineer",
    subRole: "Microservices, Distributed Systems & AI-Driven Engineering",
    email: "durgashankarpatra380@gmail.com",
    location: "Indore, India (Open to Relocate)",
    nativeLocation: "Balasore, Odisha",
    linkedin: "https://www.linkedin.com/in/durgashankarpatra-java-developer",
    experience: "4.5+ years of enterprise distributed systems experience",
    skills: [
      "Java 17 / 21",
      "Spring Boot 3.x",
      "Apache Kafka (Event-Driven)",
      "AWS (EC2, S3, RDS)",
      "Redis Caching",
      "Resilience4j",
      "PostgreSQL & MySQL",
      "Docker & Kubernetes",
      "Keycloak (OAuth2/JWT)",
      "Cursor & Claude 3.5 Sonnet",
      "Jenkins CI/CD",
      "JUnit 5 & Mockito"
    ],
    bio: "Product-focused Senior Java Software Engineer with 4.5+ years of experience designing and building enterprise distributed systems, custom connectors, and scalable microservices from scratch using Java 17/21, Spring Boot 3.x, Apache Kafka, and AWS. Proven track record of architecting event-driven backends handling 10,000+ RPS with 99.99% system availability and reducing p99 API latency by 40%. Power user of AI coding assistants (Cursor, Claude, Copilot) to accelerate SDLC delivery while enforcing strict OWASP, performance, and Clean Code standards."
  };

  return (
    <div className="profile-container">
      <div className="profile-hero-header">
        <h1>👤 Professional Profile</h1>
        <p className="profile-tagline">Executive overview of background, skills & architectural strengths</p>
      </div>

      <div className="profile-card">
        <div className="profile-card-top">
          <div className="profile-title-block">
            <h2>{profile.name}</h2>
            <p className="profile-role">{profile.role}</p>
            <p className="profile-subrole">{profile.subRole}</p>
          </div>
          <div className="profile-status-badge">
            <FaMapMarkerAlt style={{ marginRight: 6 }} /> Open to Relocate
          </div>
        </div>

        <div className="profile-info-grid">
          <div className="info-cell">
            <span className="info-label"><FaEnvelope /> Email:</span>
            <span className="info-val">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>
          </div>
          <div className="info-cell">
            <span className="info-label"><FaMapMarkerAlt /> Current Location:</span>
            <span className="info-val">{profile.location}</span>
          </div>
          <div className="info-cell">
            <span className="info-label"><FaBriefcase /> Experience:</span>
            <span className="info-val">{profile.experience}</span>
          </div>
          <div className="info-cell full-width">
            <span className="info-label"><FaLinkedin /> LinkedIn Profile:</span>
            <span className="info-val">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                {profile.linkedin}
              </a>
            </span>
          </div>
        </div>

        <div className="profile-bio-box">
          <h3>Professional Summary</h3>
          <p>{profile.bio}</p>
        </div>

        <div className="profile-skills-box">
          <h3>Core Technical Arsenal</h3>
          <div className="profile-skills-tags">
            {profile.skills.map((skill, index) => (
              <span key={index} className="profile-skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
