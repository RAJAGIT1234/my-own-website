import React from "react";
import "../styles/resume.css";
import {
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
  FaDownload,
  FaPrint,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaRocket,
  FaFileAlt
} from "react-icons/fa";

export default function Resume() {
  const technicalSkills = [
    {
      category: "Languages & Core",
      skills: "Java 17 / 21, SQL, Multithreading, Concurrency, Virtual Threads, Data Structures, Design Patterns (Factory, Strategy, Builder, Singleton), System Design"
    },
    {
      category: "Backend & Microservices",
      skills: "Spring Boot 3.x, Microservices Architecture, Spring Cloud (Eureka, OpenFeign, Gateway), Spring Data JPA, Hibernate, Resilience4j, REST APIs"
    },
    {
      category: "Distributed Systems",
      skills: "Apache Kafka (Event-Driven Architecture, Pub/Sub, DLQ, Idempotent Consumers), Event-Sourcing & Saga Pattern"
    },
    {
      category: "Databases & Caching",
      skills: "PostgreSQL, MySQL, MongoDB, Redis (Distributed Caching, Rate Limiting & Session Store), Query Optimization & Indexing"
    },
    {
      category: "Security & Observability",
      skills: "Keycloak (IAM), OAuth 2.0, JWT, Spring Security, Prometheus, Grafana, OpenTelemetry, SonarQube"
    },
    {
      category: "Cloud & DevOps",
      skills: "AWS (EC2, S3, RDS, CloudWatch, IAM), Docker, Kubernetes (K8s Deployments & Services), Jenkins CI/CD, Maven"
    },
    {
      category: "AI Coding & Testing",
      skills: "Cursor IDE, GitHub Copilot, Claude 3.5 Sonnet (AI-Assisted Dev & Code Review), JUnit 5, Mockito, TDD, Postman, Git, JIRA"
    }
  ];

  return (
    <section className="resume-section">
      {/* Top Action Bar */}
      <div className="resume-action-bar no-print">
        <a href="/resume.pdf" className="btn-primary" download="Durgashankar_Patra_Resume.pdf">
          <FaDownload style={{ marginRight: 8 }} /> Download PDF Resume
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="btn-secondary"
        >
          <FaPrint style={{ marginRight: 8 }} /> Print / Save as PDF
        </button>
      </div>

      {/* Resume Document Wrapper (Formatted exactly like an executive resume) */}
      <div className="resume-paper">
        {/* Header */}
        <header className="resume-header">
          <h1 className="resume-name">DURGASHANKAR PATRA</h1>
          <p className="resume-role-header">
            Senior Java Software Engineer | Microservices, Distributed Systems & AI-Driven Engineering
          </p>
          <div className="resume-contact-row">
            <span><FaEnvelope /> <a href="mailto:durgashankarpatra380@gmail.com">durgashankarpatra380@gmail.com</a></span>
            <span>
              <FaLinkedin />{" "}
              <a
                href="https://www.linkedin.com/in/durgashankarpatra-java-developer"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/durgashankarpatra-java-developer
              </a>
            </span>
          </div>
          <div className="resume-meta-row">
            <span><FaMapMarkerAlt /> Indore, India (Open to Relocate)</span>
          </div>
        </header>

        {/* Section: Professional Summary */}
        <section className="resume-block">
          <h2 className="resume-block-title">PROFESSIONAL SUMMARY</h2>
          <p className="summary-text">
            Product-focused Senior Java Software Engineer with <strong>4.5+ years of experience</strong> designing and building enterprise distributed systems, custom connectors, and scalable microservices from scratch using <strong>Java 17/21, Spring Boot 3.x, Apache Kafka, and AWS</strong>. Proven track record of architecting event-driven backends handling <strong>10,000+ RPS with 99.99% system availability</strong> and <strong>reducing p99 API latency by 40%</strong>. Power user of AI coding assistants (Cursor IDE, Claude, GitHub Copilot) to accelerate SDLC delivery while establishing rigorous code review and validation gates for enterprise security (OWASP), performance, and Clean Code standards.
          </p>
        </section>

        {/* Section: Technical Skills */}
        <section className="resume-block">
          <h2 className="resume-block-title">TECHNICAL SKILLS</h2>
          <div className="skills-table">
            {technicalSkills.map((item, idx) => (
              <div key={idx} className="skills-row">
                <div className="skill-cat-col">{item.category}:</div>
                <div className="skill-val-col">{item.skills}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Professional Experience */}
        <section className="resume-block">
          <h2 className="resume-block-title">PROFESSIONAL EXPERIENCE</h2>

          {/* Job 1 */}
          <div className="experience-item">
            <div className="exp-heading-row">
              <h3>Senior Java Software Engineer — <span className="company-name">Advantal Technologies, Indore</span></h3>
              <span className="exp-duration">May 2022 – Present</span>
            </div>
            <ul className="exp-bullets">
              <li>Architected and built scalable microservices and reusable enterprise connectors from scratch using <strong>Java 17 and Spring Boot</strong>, supporting peak production loads of <strong>8,000+ RPS across AWS with 99.99% uptime</strong>.</li>
              <li>Implemented <strong>multi-tier Redis caching</strong> and optimized complex SQL query plans/indexing, cutting database load by 45% and <strong>dropping p99 API response times from 420ms to 75ms</strong>.</li>
              <li>Designed highly resilient <strong>Event-Driven Architecture with Apache Kafka handling 2M+ messages daily</strong> with idempotent consumers and dead-letter queues (DLQ), ensuring zero data loss.</li>
              <li>Led end-to-end monolithic decomposition into microservices and implemented fault tolerance using <strong>Resilience4j Circuit Breakers</strong> and rate limiters.</li>
              <li>Hardened API security with <strong>Keycloak (OAuth 2.0/JWT)</strong>, enforced OWASP compliance, and set up SonarQube quality gates to maintain zero critical vulnerabilities.</li>
              <li>Pioneered adoption of AI coding tools (<strong>Cursor, Claude, GitHub Copilot</strong>) across backend workflows; formulated prompt guidelines for automated JUnit 5/Mockito test generation and strictly validated AI output for security, memory leaks, and concurrency bugs.</li>
            </ul>
          </div>

          {/* Job 2 */}
          <div className="experience-item">
            <div className="exp-heading-row">
              <h3>Java Developer — <span className="company-name">GluedIn (formerly Plus Saw India Pvt. Ltd.)</span></h3>
              <span className="exp-duration">November 2021 – May 2022</span>
            </div>
            <ul className="exp-bullets">
              <li>Developed high-throughput, low-latency RESTful APIs and core business services for a high-traffic social media streaming platform using <strong>Java, Spring Boot, and PostgreSQL</strong>.</li>
              <li>Built automated CI/CD deployment pipelines using <strong>Docker and Jenkins on AWS EC2</strong>, improving deployment cadence by 40%.</li>
              <li>Integrated <strong>Apache Kafka</strong> for real-time asynchronous user notifications and feed aggregation; utilized <strong>AWS S3</strong> for scalable multimedia ingestion.</li>
              <li>Conducted performance profiling and load testing using <strong>JMeter and Postman</strong>, identifying bottlenecks and improving API throughput by 25%.</li>
            </ul>
          </div>
        </section>

        {/* Section: Key Projects & Solutions Built from Scratch */}
        <section className="resume-block">
          <h2 className="resume-block-title">KEY PROJECTS & SOLUTIONS BUILT FROM SCRATCH</h2>

          <div className="resume-project-item">
            <div className="proj-title-row">
              <strong>KreditLo – Digital Micro-Credit & Loan Processing Engine</strong>
              <span className="proj-tech">Tech: Java 17, Spring Boot, Kafka, Redis, PostgreSQL, AWS</span>
            </div>
            <ul className="proj-bullets">
              <li>Engineered an end-to-end loan processing engine from scratch handling high-precision interest calculations, automated KYC workflows, and repayment schedule generation.</li>
              <li>Built custom payment gateway connectors and an automated credit scoring rule engine, reducing manual loan verification turnaround time by 45%.</li>
            </ul>
          </div>

          <div className="resume-project-item">
            <div className="proj-title-row">
              <strong>Marks and Spencer India – High-Throughput Inventory Sync Engine</strong>
              <span className="proj-tech">Tech: Java 17, AWS IoT, REST APIs, SAP ERP Integration</span>
            </div>
            <ul className="proj-bullets">
              <li>Architected real-time ingestion pipelines syncing RFID retail stock data with central SAP ERP systems, processing 10,000+ items/minute with sub-second synchronization.</li>
            </ul>
          </div>

          <div className="resume-project-item">
            <div className="proj-title-row">
              <strong>TACACS & MCMM LMS – Centralized IAM & Secure Training Architecture</strong>
              <span className="proj-tech">Tech: Java, Spring Security, Keycloak, 2FA, Docker, MySQL</span>
            </div>
            <ul className="proj-bullets">
              <li>Developed a centralized authentication and authorization gateway supporting 2FA, comprehensive audit logs, and granular role-based access controls for enterprise defense systems.</li>
            </ul>
          </div>
        </section>

        {/* Section: Education */}
        <section className="resume-block">
          <h2 className="resume-block-title">EDUCATION</h2>
          <div className="education-row">
            <div>
              <strong>Bachelor of Technology (B.Tech) – Computer Science & Engineering</strong>
              <span className="edu-univ"> | Biju Patnaik University of Technology (BPUT), Odisha</span>
            </div>
            <span className="edu-year">2016 – 2020</span>
          </div>
        </section>
      </div>
    </section>
  );
}
