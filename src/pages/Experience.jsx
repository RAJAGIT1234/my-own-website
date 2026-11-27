import React from "react";
import "../styles/Experience.css";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaRocket, FaBolt } from "react-icons/fa";

export default function Experience() {
  const experiences = [
    {
      company: "Advantal Technologies",
      role: "Senior Java Software Engineer",
      duration: "May 2022 – Present",
      location: "Indore, India",
      tagline: "Enterprise Distributed Systems, High-Throughput Microservices & Event-Driven Backends",
      tech: ["Java 17 / 21", "Spring Boot 3.x", "Apache Kafka", "Redis L2 Cluster", "AWS ECS / RDS", "Virtual Threads", "Resilience4j", "Keycloak", "Docker", "SonarQube", "Cursor/Claude"],
      metrics: [
        "8,000+ RPS Peak Load",
        "99.99% System Availability",
        "420ms ➔ 75ms p99 Latency Drop",
        "2.4M+ Daily Kafka Events",
        "Zero Critical OWASP Vulns"
      ],
      details: [
        "Architected and built scalable microservices and reusable enterprise connectors from scratch using Java 17/21 and Spring Boot 3.x, supporting peak production loads of 8,000+ RPS across AWS with 99.99% availability.",
        "Implemented multi-tier Redis caching and optimized complex SQL query plans/indexing, cutting primary database load by 45% and dropping p99 API response times from 420ms to 75ms.",
        "Designed highly resilient Event-Driven Architecture with Apache Kafka handling 2.4M+ messages daily with idempotent consumers and dead-letter queues (DLQ), ensuring zero data loss.",
        "Led end-to-end monolithic decomposition into microservices and implemented fault tolerance using Resilience4j Circuit Breakers, rate limiters, and Virtual Threads concurrency.",
        "Hardened perimeter security with Keycloak (OAuth 2.0/JWT), enforced strict OWASP compliance, and set up SonarQube quality gates to maintain zero critical vulnerabilities.",
        "Pioneered adoption of AI-accelerated engineering (Cursor, Claude 3.5 Sonnet, GitHub Copilot) across backend workflows; formulated prompt guidelines for automated JUnit 5/Mockito test generation with 92% coverage."
      ]
    },
    {
      company: "GluedIn (formerly Plus Saw India Pvt. Ltd.)",
      role: "Java Developer",
      duration: "November 2021 – May 2022",
      location: "Delhi / Faridabad, India",
      tagline: "High-Traffic Social Media Streaming Platform & Asynchronous Event Processing",
      tech: ["Java", "Spring Boot", "PostgreSQL", "Apache Kafka", "Docker", "Jenkins CI/CD", "AWS EC2/S3", "JMeter"],
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
      <div className="exp-ambient-beam"></div>

      <div className="exp-intro">
        <span className="exp-kicker">ENTERPRISE CAREER MILESTONES</span>
        <h1>Professional Engineering Journey</h1>
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
              <span className="exp-location-tag"><FaMapMarkerAlt style={{ color: "#38bdf8" }} /> {exp.location}</span>
              <span className="exp-tagline-text">• {exp.tagline}</span>
            </div>

            {/* Impact Metrics Strip */}
            <div className="exp-metrics-strip">
              {exp.metrics.map((m, i) => (
                <span key={i} className="exp-metric-pill">
                  ⚡ {m}
                </span>
              ))}
            </div>

            {/* Accomplishments */}
            <ul className="exp-details-list">
              {exp.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>

            {/* Tech Tags */}
            <div className="exp-tech-section">
              <span className="exp-tech-title">TECHNOLOGIES & TOOLS:</span>
              <div className="exp-tech-tags">
                {exp.tech.map((t, i) => (
                  <span key={i} className="exp-tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
