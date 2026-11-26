import React from "react";
import "../styles/Experience.css";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaRocket } from "react-icons/fa";

export default function Experience() {
  const experiences = [
    {
      company: "Advantal Technologies",
      role: "Senior Java Software Engineer",
      duration: "May 2022 – Present",
      location: "Indore, India",
      tagline: "Enterprise Distributed Systems, High-Throughput Microservices & Event-Driven Backends",
      tech: ["Java 17", "Spring Boot 3.x", "Apache Kafka", "Redis", "AWS", "Resilience4j", "Keycloak", "Docker", "SonarQube", "Cursor/Claude"],
      metrics: [
        "8,000+ RPS Peak Load",
        "99.99% Uptime",
        "420ms ➔ 75ms p99 Latency",
        "2M+ Daily Kafka Events",
        "Zero Critical OWASP Vulns"
      ],
      details: [
        "Architected and built scalable microservices and reusable enterprise connectors from scratch using Java 17 and Spring Boot, supporting peak production loads of 8,000+ RPS across AWS with 99.99% uptime.",
        "Implemented multi-tier Redis caching and optimized complex SQL query plans/indexing, cutting database load by 45% and dropping p99 API response times from 420ms to 75ms.",
        "Designed highly resilient Event-Driven Architecture with Apache Kafka handling 2M+ messages daily with idempotent consumers and dead-letter queues (DLQ), ensuring zero data loss.",
        "Led end-to-end monolithic decomposition into microservices and implemented fault tolerance using Resilience4j Circuit Breakers and rate limiters.",
        "Hardened API security with Keycloak (OAuth 2.0/JWT), enforced OWASP compliance, and set up SonarQube quality gates to maintain zero critical vulnerabilities.",
        "Pioneered adoption of AI coding tools (Cursor, Claude, GitHub Copilot) across backend workflows; formulated prompt guidelines for automated JUnit 5/Mockito test generation and strictly validated AI output for security, memory leaks, and concurrency bugs."
      ]
    },
    {
      company: "GluedIn (formerly Plus Saw India Pvt. Ltd.)",
      role: "Java Developer",
      duration: "November 2021 – May 2022",
      location: "Delhi / Faridabad, India",
      tagline: "High-Traffic Social Media Streaming Platform & Asynchronous Event Processing",
      tech: ["Java", "Spring Boot", "PostgreSQL", "Apache Kafka", "Docker", "Jenkins", "AWS EC2/S3", "JMeter"],
      metrics: [
        "40% Deployment Cadence Boost",
        "+25% API Throughput",
        "Scalable Multimedia Ingestion"
      ],
      details: [
        "Developed high-throughput, low-latency RESTful APIs and core business services for a high-traffic social media streaming platform using Java, Spring Boot, and PostgreSQL.",
        "Built automated CI/CD deployment pipelines using Docker and Jenkins on AWS EC2, improving deployment cadence by 40%.",
        "Integrated Apache Kafka for real-time asynchronous user notifications and feed aggregation; utilized AWS S3 for scalable multimedia ingestion.",
        "Conducted performance profiling and load testing using JMeter and Postman, identifying bottlenecks and improving API throughput by 25%."
      ]
    }
  ];

  return (
    <div className="experience-container">
      <div className="exp-intro">
        <h1>💼 Professional Experience</h1>
        <p className="experience-tagline">
          4.5+ years of delivering high-scale enterprise distributed systems, custom connectors, and event-driven backends.
        </p>
      </div>

      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div className="experience-card" key={index}>
            <div className="exp-header-top">
              <span className="exp-role-badge">{exp.role}</span>
              <span className="exp-duration-badge">
                <FaCalendarAlt style={{ marginRight: 6 }} /> {exp.duration}
              </span>
            </div>

            <h2 className="exp-company-title">{exp.company}</h2>
            <div className="exp-meta-line">
              <span><FaMapMarkerAlt /> {exp.location}</span>
              <span className="exp-tagline-text">{exp.tagline}</span>
            </div>

            {/* Impact Metrics */}
            <div className="exp-metrics-strip">
              {exp.metrics.map((m, i) => (
                <span key={i} className="exp-metric-pill">
                  ⚡ {m}
                </span>
              ))}
            </div>

            {/* Tech chips */}
            <div className="exp-tech-chips">
              {exp.tech.map((t, i) => (
                <span key={i} className="exp-tech-chip">
                  {t}
                </span>
              ))}
            </div>

            {/* Accomplishments */}
            <h4 className="exp-accomplishments-title">Key Engineering Contributions:</h4>
            <ul className="exp-details-list">
              {exp.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
