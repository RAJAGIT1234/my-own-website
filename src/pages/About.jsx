import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";
import {
  FaJava,
  FaDatabase,
  FaCloud,
  FaShieldAlt,
  FaRobot,
  FaCogs,
  FaLayerGroup,
  FaCheckCircle,
  FaAward,
  FaAws
} from "react-icons/fa";
import {
  SiSpringboot,
  SiApachekafka,
  SiRedis,
  SiPostgresql,
  SiDocker,
  SiKubernetes
} from "react-icons/si";

export default function About() {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const skillCategories = [
    {
      id: "backend",
      title: "Backend & Microservices",
      icon: <SiSpringboot />,
      skills: [
        { name: "Java 17 / 21 (Virtual Threads, Concurrency)", level: 95 },
        { name: "Spring Boot 3.x & Spring Cloud Ecosystem", level: 95 },
        { name: "Microservices Architecture & Monolith Decomposition", level: 92 },
        { name: "Spring Data JPA & Hibernate ORM", level: 90 },
        { name: "Resilience4j (Circuit Breakers & Rate Limiters)", level: 88 },
        { name: "High-Throughput RESTful APIs", level: 95 }
      ]
    },
    {
      id: "distributed",
      title: "Distributed Systems & Caching",
      icon: <SiApachekafka />,
      skills: [
        { name: "Apache Kafka (Pub/Sub, DLQ, Idempotent Consumers)", level: 92 },
        { name: "Redis (Distributed Caching, Rate Limiting, Session Store)", level: 90 },
        { name: "Event-Sourcing & Saga Pattern", level: 85 },
        { name: "p99 Latency Optimization & Index Tuning", level: 90 }
      ]
    },
    {
      id: "cloud",
      title: "Cloud, DevOps & Databases",
      icon: <FaAws />,
      skills: [
        { name: "AWS (EC2, S3, RDS, CloudWatch, IAM)", level: 88 },
        { name: "Docker & Containerization", level: 90 },
        { name: "Kubernetes (K8s Deployments & Services)", level: 85 },
        { name: "PostgreSQL, MySQL & MongoDB", level: 90 },
        { name: "CI/CD Automation (Jenkins, Maven)", level: 86 }
      ]
    },
    {
      id: "security_ai",
      title: "Security, Observability & AI Engineering",
      icon: <FaShieldAlt />,
      skills: [
        { name: "Keycloak (IAM), OAuth 2.0 & JWT Security", level: 90 },
        { name: "Spring Security & OWASP Compliance", level: 90 },
        { name: "AI Coding (Cursor IDE, Claude 3.5 Sonnet, Copilot)", level: 95 },
        { name: "Automated Testing (JUnit 5, Mockito, TDD)", level: 92 },
        { name: "Observability (Prometheus, Grafana, SonarQube)", level: 85 }
      ]
    }
  ];

  const highlights = [
    {
      title: "Distributed System Architecture",
      desc: "Designed and built enterprise backends handling 8,000+ RPS peak load and 2M+ daily Kafka events with zero data loss."
    },
    {
      title: "Performance & Latency Optimization",
      desc: "Dropped p99 API latency from 420ms to 75ms (40% reduction) using Redis caching, connection pooling, and SQL indexing."
    },
    {
      title: "AI-Augmented SDLC Delivery",
      desc: "Pioneered LLM-assisted workflows (Cursor, Claude, Copilot) for test scaffolding, code reviews, and rapid prototyping with strict security verification."
    },
    {
      title: "Enterprise Grade Security",
      desc: "Hardened microservice perimeters using Keycloak IAM, OAuth 2.0/JWT token validation, SonarQube quality gates, and OWASP best practices."
    }
  ];

  const displayedCategories =
    activeCategory === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeCategory);

  return (
    <section className={`about-section ${visible ? "visible" : ""}`}>
      <div className="about-container">
        <h1 className="about-title">About Me</h1>
        <p className="about-role-tag">
          Senior Java Software Engineer • Microservices & Distributed Systems Specialist
        </p>

        {/* Bio Card */}
        <div className="about-bio-card">
          <p className="about-lead">
            I am a product-focused <span className="highlight">Senior Java Software Engineer</span> with{" "}
            <strong>4.5+ years of experience</strong> architecting enterprise distributed systems, custom connectors,
            and high-throughput microservices from scratch using <strong>Java 17/21, Spring Boot 3.x, Apache Kafka, and AWS</strong>.
          </p>
          <p className="about-details">
            My engineering philosophy centers on reliability, speed, and clean code. I have a proven track record of
            handling <strong>10,000+ RPS backends</strong> with <strong>99.99% system availability</strong>, reducing p99 API latency by 40%,
            and decomposing legacy monolithic systems into resilient, event-driven architectures.
          </p>
          <p className="about-ai-focus">
            ⚡ <strong>AI-Driven Engineering:</strong> I actively harness cutting-edge AI developer tools (Cursor IDE, Claude 3.5 Sonnet, GitHub Copilot) to accelerate delivery cycles while enforcing rigorous manual code reviews and validation gates for OWASP security, memory safety, and concurrency correctness.
          </p>
        </div>

        {/* Key Highlights */}
        <h2 className="section-subheading">🏆 Architectural Strengths</h2>
        <div className="highlights-grid">
          {highlights.map((item, idx) => (
            <div key={idx} className="highlight-card">
              <div className="highlight-icon"><FaAward /></div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Skills Categorized */}
        <h2 className="section-subheading">💻 Technical Expertise & Proficiency</h2>

        {/* Category Filter Pills */}
        <div className="category-filter-pills">
          <button
            className={`filter-pill ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Skills
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-pill ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="skills-category-grid">
          {displayedCategories.map((category) => (
            <div key={category.id} className="category-block">
              <div className="category-header">
                <span className="cat-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className="category-skills-list">
                {category.skills.map((skill, index) => (
                  <div className="skill-card" key={index}>
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{
                          width: visible ? `${skill.level}%` : "0%",
                          transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="about-footer-cta">
          <Link to="/projects" className="btn-primary">
            Explore Built Projects 🚀
          </Link>
          <Link to="/resume" className="btn-secondary">
            View Complete Resume 📄
          </Link>
        </div>
      </div>
    </section>
  );
}
