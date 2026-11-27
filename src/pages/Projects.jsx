import React, { useState, useRef } from "react";
import "../styles/projects.css";
import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaTags,
  FaShieldAlt,
  FaServer,
  FaCheckCircle,
  FaChartLine,
  FaBolt,
  FaLayerGroup
} from "react-icons/fa";

// Helper for 3D tilt
const calcTilt = (e, cardElement) => {
  const rect = cardElement.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const midX = rect.width / 2;
  const midY = rect.height / 2;

  const rotateX = ((y - midY) / midY) * -6;
  const rotateY = ((x - midX) / midX) * 6;
  return { rotateX, rotateY };
};

const cardVariant = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function ProjectCard({ proj }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef(null);

  return (
    <motion.div
      className="project-card"
      variants={cardVariant}
      ref={cardRef}
      style={{
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.015 }}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      onMouseMove={(e) => {
        if (cardRef.current) {
          const { rotateX, rotateY } = calcTilt(e, cardRef.current);
          setTilt({ rotateX, rotateY });
        }
      }}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
    >
      <div className="card-top-badge">
        <span className="badge-scratch">⚡ Built from Scratch</span>
        <span className="badge-impact">{proj.badge}</span>
      </div>

      <div className="card-header">
        <div className="card-icon">{proj.icon}</div>
        <div>
          <h2>{proj.title}</h2>
          <p className="card-subtitle">{proj.subtitle}</p>
        </div>
      </div>

      {/* Tech Stack Chips */}
      <div className="project-tech-tags">
        {proj.tech.map((t, i) => (
          <span key={i} className="tech-tag">
            {t}
          </span>
        ))}
      </div>

      {/* Architecture Highlights */}
      <div className="card-highlights">
        <h4>Key Architectural Contributions:</h4>
        <ul>
          {proj.details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      </div>

      {/* Production Impact Metrics */}
      <div className="card-metrics-row">
        {proj.metrics.map((m, i) => (
          <div key={i} className="card-metric-pill">
            <FaChartLine style={{ marginRight: 6, color: "#34d399" }} />
            <span>{m}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: "kreditlo",
      category: "fintech",
      title: "KreditLo – Digital Micro-Credit & Loan Processing Engine",
      subtitle: "High-Precision Loan Lifecycle, Credit Scoring & Automated Verification",
      icon: <FaCreditCard />,
      badge: "FinTech & Banking Core",
      tech: [
        "Java 17 / 21",
        "Spring Boot 3.x",
        "Apache Kafka",
        "Multi-Tier Redis",
        "PostgreSQL / Aurora",
        "AWS ECS",
        "Saga Pattern"
      ],
      details: [
        "Engineered an end-to-end loan processing engine from scratch handling high-precision interest calculations, automated KYC workflows, and repayment schedule generation.",
        "Built custom payment gateway connectors and an automated credit scoring rule engine, reducing manual loan verification turnaround time by 45%.",
        "Integrated multi-tier Redis caching and event-driven repayment webhooks with idempotent message processing to guarantee zero duplicate debit transactions.",
        "Implemented Saga orchestration with automated compensating rollbacks, ensuring strict ACID state consistency across distributed microservice hops."
      ],
      metrics: ["45% Turnaround Reduction", "Zero Calculation Drift", "Idempotent Webhooks", "8,000+ RPS Scale"]
    },
    {
      id: "mands",
      category: "retail",
      title: "Marks & Spencer India – High-Throughput Inventory Sync Engine",
      subtitle: "Real-Time RFID Retail Stock Synchronization & SAP ERP Pipeline",
      icon: <FaTags />,
      badge: "Retail & Supply Chain",
      tech: [
        "Java 17",
        "Spring Boot",
        "AWS IoT",
        "REST APIs",
        "SAP ERP Integration",
        "Kafka DLQ",
        "Docker"
      ],
      details: [
        "Architected real-time ingestion pipelines syncing RFID retail stock data with central SAP ERP systems, processing 10,000+ items/minute with sub-second synchronization.",
        "Engineered resilient consumer queues with automated retry policies and dead-letter queues (DLQ), ensuring complete data consistency across physical stores.",
        "Ensured code quality with SonarQube quality gates, implemented comprehensive JUnit 5 integration test suites, and tracked delivery with JIRA."
      ],
      metrics: ["10,000+ Items/Minute", "Sub-Second Sync", "Zero Stock Drift", "100% Audit Accuracy"]
    },
    {
      id: "tacacs",
      category: "security",
      title: "TACACS & MCMM LMS – Centralized IAM & Secure Defense Architecture",
      subtitle: "Centralized Authentication, 2FA, Audit Logging & Role-Based Access",
      icon: <FaShieldAlt />,
      badge: "Enterprise Defense & IAM",
      tech: [
        "Java",
        "Spring Security",
        "Keycloak (IAM)",
        "OAuth 2.0 / JWT",
        "2FA",
        "Docker",
        "MySQL"
      ],
      details: [
        "Developed a centralized authentication and authorization gateway supporting 2FA, comprehensive audit logs, and granular role-based access controls for enterprise defense systems.",
        "Built secure administrative dashboards for device and user management (list, search, modify, export compliance reports).",
        "Enforced strict OWASP security standards, secure credential rotation, and session tracking across distributed training modules."
      ],
      metrics: ["Enterprise 2FA Gateway", "Zero Critical Vulnerabilities", "Full Audit Trail", "OWASP Hardened"]
    }
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // Animation containers
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <section className="projects-section">
      <div className="projects-ambient-beam"></div>

      <div className="projects-intro-block">
        <span className="projects-kicker">PROVEN PRODUCTION ARCHITECTURE</span>
        <motion.h1
          className="projects-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Key Projects & Enterprise Engines Built from Scratch
        </motion.h1>
        <p className="projects-subtitle-text">
          Enterprise distributed backends, microservice connectors, and real-time event-driven engines
          architected for massive concurrency, sub-second latency, and fault tolerance.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="projects-filter-bar">
        <button
          type="button"
          className={`proj-filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Systems ({projects.length})
        </button>
        <button
          type="button"
          className={`proj-filter-btn ${filter === "fintech" ? "active" : ""}`}
          onClick={() => setFilter("fintech")}
        >
          FinTech & Loans (KreditLo)
        </button>
        <button
          type="button"
          className={`proj-filter-btn ${filter === "retail" ? "active" : ""}`}
          onClick={() => setFilter("retail")}
        >
          Retail & Supply Chain (M&S)
        </button>
        <button
          type="button"
          className={`proj-filter-btn ${filter === "security" ? "active" : ""}`}
          onClick={() => setFilter("security")}
        >
          Enterprise Defense & IAM
        </button>
      </div>

      <motion.div
        className="projects-grid"
        variants={container}
        initial="hidden"
        animate="show"
        key={filter}
      >
        {filteredProjects.map((proj) => (
          <ProjectCard key={proj.id} proj={proj} />
        ))}
      </motion.div>
    </section>
  );
}
