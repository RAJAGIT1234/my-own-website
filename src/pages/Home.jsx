import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import profileImg from "../assets/Media.jpg";
import Particles from "react-tsparticles";
import {
  FaServer,
  FaBolt,
  FaShieldAlt,
  FaBrain,
  FaTerminal,
  FaMicrochip,
  FaNetworkWired,
  FaDatabase,
  FaCheckCircle,
  FaChartLine,
  FaLinkedin,
  FaDownload,
  FaMapMarkerAlt,
  FaArrowRight,
  FaVolumeUp,
  FaAws,
  FaJava,
  FaExchangeAlt,
  FaLayerGroup
} from "react-icons/fa";
import {
  SiSpringboot,
  SiApachekafka,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiPostgresql
} from "react-icons/si";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [terminalTab, setTerminalTab] = useState("kafka");
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const fullText = "Hi, I’m Durgashankar Patra";

  const dynamicRoles = [
    { title: "Senior Java Software Engineer", sub: "Microservices • Distributed Systems • AI-Driven SDLC" },
    { title: "Distributed Systems Architect", sub: "Apache Kafka • Event-Driven Pub/Sub • Saga Pattern" },
    { title: "High-Throughput Backend Specialist", sub: "Java 17/21 • Spring Boot 3.x • Virtual Threads" },
    { title: "Low-Latency Optimization Expert", sub: "Multi-tier Redis Caching • p99 75ms • Zero Data Loss" }
  ];

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 85);
    return () => clearInterval(interval);
  }, []);

  // Role rotator
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % dynamicRoles.length);
    }, 3200);
    return () => clearInterval(roleTimer);
  }, [dynamicRoles.length]);

  // Spotlight mouse tracker
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    const introScript =
      "Hello! I am Durgashankar Patra, Senior Java Software Engineer with 4.5 plus years of experience in distributed systems, high throughput microservices with Spring Boot, Apache Kafka, and AWS. I specialize in event-driven architectures, low latency APIs, and AI-accelerated software engineering. Welcome to my portfolio!";

    const msg = new SpeechSynthesisUtterance(introScript);
    msg.rate = 0.95;
    msg.pitch = 0.9;
    msg.volume = 1;
    msg.lang = "en-US";

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.name.includes("Google US English")) ||
      voices.find((v) => v.name.includes("Microsoft Aria")) ||
      voices.find((v) => v.lang === "en-US");

    if (preferredVoice) msg.voice = preferredVoice;

    setSpeaking(true);
    msg.onend = () => setSpeaking(false);
    msg.onerror = () => setSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {};
      }
    }
  }, []);

  const metrics = [
    {
      value: "4.5+ Yrs",
      label: "Enterprise Experience",
      desc: "Distributed backends & microservices built from scratch",
      gradient: "metric-purple"
    },
    {
      value: "8,000+ RPS",
      label: "Peak Production Load",
      desc: "Zero-downtime traffic across AWS cloud",
      gradient: "metric-gold"
    },
    {
      value: "99.99%",
      label: "System Availability",
      desc: "Resilience4j circuit breakers & fault-tolerant architecture",
      gradient: "metric-green"
    },
    {
      value: "420ms ➔ 75ms",
      label: "p99 Latency Drop",
      desc: "45% DB load reduction via multi-tier Redis caching",
      gradient: "metric-cyan"
    },
    {
      value: "2M+ Daily",
      label: "Kafka Event Stream",
      desc: "Idempotent consumers & Dead Letter Queues (DLQ)",
      gradient: "metric-pink"
    },
    {
      value: "10,000+ /min",
      label: "Real-Time Pipeline",
      desc: "Sub-second RFID sync with central SAP ERP",
      gradient: "metric-blue"
    }
  ];

  const pillars = [
    {
      icon: <SiApachekafka />,
      badge: "Event-Driven Core",
      title: "Distributed Systems & Kafka",
      desc: "High-scale event streaming with Apache Kafka, Pub/Sub, DLQ, Idempotent Consumers, Event-Sourcing & Saga Pattern guaranteeing zero data loss under peak load."
    },
    {
      icon: <SiSpringboot />,
      badge: "Microservices",
      title: "High-Throughput Backends",
      desc: "Architected enterprise microservices with Java 17/21, Spring Boot 3.x, Spring Cloud (Eureka, OpenFeign, Gateway), and Virtual Threads for ultra-high concurrency."
    },
    {
      icon: <FaBrain />,
      badge: "Next-Gen SDLC",
      title: "AI-Augmented Engineering",
      desc: "Power user of Cursor IDE, Claude 3.5 Sonnet & GitHub Copilot to accelerate feature velocity while establishing strict OWASP, memory safety, and concurrency verification."
    },
    {
      icon: <FaShieldAlt />,
      badge: "Security & Observability",
      title: "IAM & Telemetry Mesh",
      desc: "Hardened perimeter security with Keycloak IAM, OAuth 2.0/JWT token gates, and end-to-end distributed tracing using Prometheus, Grafana, OpenTelemetry & SonarQube."
    }
  ];

  const terminalFeeds = {
    kafka: [
      { tag: "[CLUSTER-COORDINATOR]", color: "green", text: "Broker 1-3 online • 16 Partitions balanced across AWS multi-AZ" },
      { tag: "[LOAN-EVENT-PRODUCER]", color: "cyan", text: "Streaming 2,410,800 events/day • Zero consumer lag reported" },
      { tag: "[IDEMPOTENT-CONSUMER]", color: "purple", text: "Commit offset 988421 verified • DLQ: 0 failed records" },
      { tag: "[SAGA-ORCHESTRATOR]", color: "gold", text: "Distributed transaction completed • Zero duplicate debit transactions" }
    ],
    redis: [
      { tag: "[REDIS-CLUSTER-MESH]", color: "green", text: "L2 In-Memory cache active • Hit ratio sustained at 94.8%" },
      { tag: "[KEY-VALUE-LOOKUP]", color: "cyan", text: "Key 'usr:session:99812' fetched in 1.4ms (RAM tier)" },
      { tag: "[LATENCY-HISTOGRAM]", color: "purple", text: "p99 latency dropped from 420ms to 75ms (45% database offload)" },
      { tag: "[TOKEN-BUCKET-LIMIT]", color: "gold", text: "Rate limiter throttled 8,000 req/sec cleanly • 0 dropped packets" }
    ],
    spring: [
      { tag: "[SPRING-BOOT-3.2]", color: "green", text: "Virtual Threads active on Java 21 • Concurrency pool size: 10,000" },
      { tag: "[RESILIENCE4J-GATE]", color: "cyan", text: "CircuitBreaker state: CLOSED (0 trip events in last 24 hours)" },
      { tag: "[ENTERPRISE-GATEWAY]", color: "purple", text: "Spring Cloud Gateway routing 8,240 RPS across AWS ECS containers" },
      { tag: "[AVAILABILITY-PROBE]", color: "gold", text: "Health probes green • 99.99% system availability verified" }
    ],
    ai: [
      { tag: "[AI-ASSISTED-SDLC]", color: "green", text: "Cursor IDE & Claude 3.5 Sonnet integrated across backend engineering" },
      { tag: "[TEST-GENERATION]", color: "cyan", text: "Automated JUnit 5 & Mockito suites generated with 92% code coverage" },
      { tag: "[SECURITY-SCANNER]", color: "purple", text: "SonarQube quality gates passed • Zero critical OWASP vulnerabilities" },
      { tag: "[MEMORY-LEAK-GUARD]", color: "gold", text: "Heap profile checked • Virtual threads pool running at 142MB steady" }
    ]
  };

  return (
    <div className="home-4k-wrapper">
      {/* Dynamic Cyber Grid & Aurora Glow Backdrop */}
      <div className="cyber-grid-overlay"></div>
      <div className="aurora-glow aurora-1"></div>
      <div className="aurora-glow aurora-2"></div>
      <div className="aurora-glow aurora-3"></div>

      {/* Floating Particles */}
      <Particles
        className="particles-bg"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 65 },
            size: { value: { min: 1, max: 2.5 } },
            move: { enable: true, speed: 0.9 },
            links: { enable: true, distance: 130, color: "#38bdf8", opacity: 0.25 },
            opacity: { value: 0.45 },
            color: { value: ["#38bdf8", "#818cf8", "#facc15"] }
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "push" },
            },
          },
        }}
      />

      <div className="home-container">
        {/* =========================================================
            HERO SECTION - 4K ULTRA EXECUTIVE DESIGN WITH SPOTLIGHT
           ========================================================= */}
        <section
          className="hero-4k"
          onMouseMove={handleMouseMove}
          style={{
            "--mouse-x": `${mousePos.x}%`,
            "--mouse-y": `${mousePos.y}%`
          }}
        >
          {/* Laser Moving Border Beam */}
          <div className="laser-border-beam"></div>
          <div className="hero-ambient-beam"></div>

          <div className="hero-grid-4k">
            {/* Left: Content */}
            <div className="hero-content-4k">
              {/* Electric Status Pill */}
              <div className="electric-badge">
                <span className="beacon-ring">
                  <span className="beacon-dot"></span>
                </span>
                <span className="badge-text">
                  SENIOR DISTRIBUTED SYSTEMS ARCHITECT • OPEN TO RELOCATE
                </span>
              </div>

              {/* Dynamic Typing Title */}
              <h1 className="hero-headline-4k">
                <span className="headline-text-shimmer">
                  {displayText}
                </span>
                <span className="laser-cursor">|</span>
              </h1>

              {/* Animated Rotating Role Flipper */}
              <div className="designation-chip">
                <span className="chip-glow-text role-flip-animate" key={roleIndex}>
                  {dynamicRoles[roleIndex].title}
                </span>
                <span className="chip-sub">
                  {dynamicRoles[roleIndex].sub}
                </span>
              </div>

              {/* Pitch Summary */}
              <p className="hero-description-4k">
                Product-focused Senior Engineer with <span className="highlight-electric">4.5+ years of experience</span> designing and scaling enterprise distributed backends, custom connectors, and event-driven microservices from scratch using <span className="highlight-white">Java 17/21, Spring Boot 3.x, Apache Kafka, Redis, and AWS</span>.
              </p>

              {/* Location & Quick Meta */}
              <div className="hero-meta-row-4k">
                <span className="meta-pill">
                  <FaMapMarkerAlt className="meta-icon" /> Indore, India (Open to Relocate)
                </span>
                <span className="meta-pill">
                  <FaBolt className="meta-icon gold" /> 8,000+ RPS Production Load
                </span>
                <span className="meta-pill">
                  <FaCheckCircle className="meta-icon green" /> 99.99% System Uptime
                </span>
              </div>

              {/* High-Impact Action Buttons */}
              <div className="hero-cta-group">
                <Link to="/projects" className="btn-electric-primary">
                  <span>🚀 Explore Architecture & Projects</span>
                  <FaArrowRight className="btn-arrow" />
                </Link>

                <Link to="/resume" className="btn-electric-secondary">
                  <FaDownload style={{ marginRight: 8 }} /> Executive Resume
                </Link>

                <button
                  type="button"
                  className={`btn-voice-hologram ${speaking ? "speaking" : ""}`}
                  onClick={handleSpeak}
                  disabled={speaking}
                  title="Hear Audio Greeting"
                >
                  {speaking ? (
                    <>
                      <div className="soundwave-anim">
                        <span></span><span></span><span></span><span></span>
                      </div>
                      <span>Speaking Intro...</span>
                    </>
                  ) : (
                    <>
                      <FaVolumeUp style={{ marginRight: 8 }} />
                      <span>Hear AI Intro</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Holographic Profile Display with Orbiting Tech Satellites */}
            <div className="hero-visual-4k">
              <div className="hologram-frame">
                <div className="cyber-ring-outer"></div>
                <div className="cyber-ring-inner"></div>

                {/* Orbiting Satellite Badges */}
                <div className="satellite-chip sat-1" title="Java 17 / 21 Core">
                  <FaJava /> Java 21
                </div>
                <div className="satellite-chip sat-2" title="Apache Kafka Event Stream">
                  <SiApachekafka /> Kafka
                </div>
                <div className="satellite-chip sat-3" title="Spring Boot 3.x Microservices">
                  <SiSpringboot /> Spring 3
                </div>
                <div className="satellite-chip sat-4" title="AWS Cloud Infrastructure">
                  <FaAws /> AWS
                </div>
                <div className="satellite-chip sat-5" title="Redis Distributed Cache">
                  <SiRedis /> Redis
                </div>

                <div className="profile-img-glow-wrap">
                  <img src={profileImg} alt="Durgashankar Patra" className="profile-avatar-4k" />
                </div>

                {/* Floating HUD status cards */}
                <div className="hud-floating-card hud-top">
                  <FaBolt className="hud-icon gold" />
                  <div>
                    <span className="hud-val">8,000+ RPS</span>
                    <span className="hud-lbl">Peak AWS Workload</span>
                  </div>
                </div>
                <div className="hud-floating-card hud-bottom">
                  <FaShieldAlt className="hud-icon cyan" />
                  <div>
                    <span className="hud-val">75ms p99</span>
                    <span className="hud-lbl">Optimized Latency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              LIVE ARCHITECTURE DATA PIPELINE GRAPHIC
             ========================================================= */}
          <div className="pipeline-flow-wrapper">
            <div className="pipeline-flow-title">
              <span className="pipeline-dot-pulse"></span>
              LIVE DATA INGESTION PIPELINE (EVENT-DRIVEN ARCHITECTURE)
            </div>
            <div className="pipeline-nodes-track">
              <div className="pipeline-node node-client">
                <span className="pnode-icon">🌐</span>
                <span className="pnode-label">Client Traffic</span>
                <span className="pnode-sub">8,000+ RPS</span>
              </div>

              <div className="pipeline-connector">
                <span className="pulse-packet pkt-1"></span>
                <FaArrowRight className="conn-arrow" />
              </div>

              <div className="pipeline-node node-gateway">
                <span className="pnode-icon">⚡</span>
                <span className="pnode-label">Spring Gateway</span>
                <span className="pnode-sub">OAuth 2.0 / JWT</span>
              </div>

              <div className="pipeline-connector">
                <span className="pulse-packet pkt-2"></span>
                <FaArrowRight className="conn-arrow" />
              </div>

              <div className="pipeline-node node-kafka">
                <span className="pnode-icon">🔄</span>
                <span className="pnode-label">Apache Kafka</span>
                <span className="pnode-sub">2.4M msg/day (DLQ)</span>
              </div>

              <div className="pipeline-connector">
                <span className="pulse-packet pkt-3"></span>
                <FaArrowRight className="conn-arrow" />
              </div>

              <div className="pipeline-node node-redis">
                <span className="pnode-icon">💾</span>
                <span className="pnode-label">Redis Cache</span>
                <span className="pnode-sub">75ms p99 Latency</span>
              </div>

              <div className="pipeline-connector">
                <span className="pulse-packet pkt-4"></span>
                <FaArrowRight className="conn-arrow" />
              </div>

              <div className="pipeline-node node-db">
                <span className="pnode-icon">🗄️</span>
                <span className="pnode-label">AWS RDS DB</span>
                <span className="pnode-sub">PostgreSQL / Aurora</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              INTERACTIVE ARCHITECTURE TELEMETRY CONSOLE
             ========================================================= */}
          <div className="telemetry-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="tdot t-red"></span>
                <span className="tdot t-yellow"></span>
                <span className="tdot t-green"></span>
              </div>
              <div className="terminal-title">
                <FaTerminal style={{ marginRight: 6, fontSize: "0.85rem" }} />
                durgashankar@prod-enterprise-cluster ~ telemetry-feed
              </div>
              <div className="terminal-live-badge">
                <span className="live-pulse"></span> INTERACTIVE TELEMETRY
              </div>
            </div>

            {/* Interactive Terminal Category Tabs */}
            <div className="terminal-nav-tabs">
              <button
                type="button"
                className={`ttab ${terminalTab === "kafka" ? "active" : ""}`}
                onClick={() => setTerminalTab("kafka")}
              >
                🔄 Kafka Stream
              </button>
              <button
                type="button"
                className={`ttab ${terminalTab === "redis" ? "active" : ""}`}
                onClick={() => setTerminalTab("redis")}
              >
                💾 Redis Cache (75ms)
              </button>
              <button
                type="button"
                className={`ttab ${terminalTab === "spring" ? "active" : ""}`}
                onClick={() => setTerminalTab("spring")}
              >
                ⚡ Spring Boot 3 (8k RPS)
              </button>
              <button
                type="button"
                className={`ttab ${terminalTab === "ai" ? "active" : ""}`}
                onClick={() => setTerminalTab("ai")}
              >
                🤖 AI SDLC & OWASP
              </button>
            </div>

            <div className="terminal-body" key={terminalTab}>
              {terminalFeeds[terminalTab].map((feed, idx) => (
                <div key={idx} className="terminal-line anim-feed-line" style={{ animationDelay: `${idx * 0.08}s` }}>
                  <span className={`t-tag ${feed.color}`}>{feed.tag}</span>
                  <span className="t-text">{feed.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: 4K METRIC HUD STRIP
           ========================================================= */}
        <section className="section-4k">
          <div className="section-header-4k">
            <span className="section-kicker">PROVEN TRACK RECORD</span>
            <h2>Production-Scale Impact & Benchmarks</h2>
            <p>Measurable engineering impact delivered across mission-critical enterprise environments</p>
          </div>

          <div className="metrics-hud-grid">
            {metrics.map((item, index) => (
              <div key={index} className={`metric-hud-card ${item.gradient}`}>
                <div className="card-glass-shine"></div>
                <div className="metric-hud-val">{item.value}</div>
                <div className="metric-hud-lbl">{item.label}</div>
                <p className="metric-hud-desc">{item.desc}</p>
                <div className="hud-corner-indicator"></div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 3: ARCHITECTURAL PILLARS (NEON GLASS CARDS)
           ========================================================= */}
        <section className="section-4k">
          <div className="section-header-4k">
            <span className="section-kicker">SYSTEM DESIGN & MASTERY</span>
            <h2>Core Architectural Competencies</h2>
            <p>Engineering distributed backends engineered for massive concurrency, zero data loss, and speed</p>
          </div>

          <div className="pillars-4k-grid">
            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-4k-card">
                <div className="pillar-glow-halo"></div>
                <div className="pillar-top-row">
                  <div className="pillar-icon-wrap">{pillar.icon}</div>
                  <span className="pillar-badge-pill">{pillar.badge}</span>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 4: PRIMARY TECH ARSENAL (HOLOGRAPHIC CHIPS)
           ========================================================= */}
        <section className="section-4k">
          <div className="section-header-4k">
            <span className="section-kicker">TECHNICAL ARSENAL</span>
            <h2>Enterprise Technology Ecosystem</h2>
          </div>

          <div className="tech-matrix-wrap">
            {[
              { name: "Java 17 / 21", category: "core" },
              { name: "Spring Boot 3.x", category: "backend" },
              { name: "Apache Kafka", category: "distributed" },
              { name: "AWS (EC2, S3, RDS)", category: "cloud" },
              { name: "Redis Caching", category: "distributed" },
              { name: "PostgreSQL & MySQL", category: "db" },
              { name: "Resilience4j", category: "backend" },
              { name: "Docker & Kubernetes", category: "cloud" },
              { name: "Keycloak (OAuth2/JWT)", category: "security" },
              { name: "Virtual Threads & Concurrency", category: "core" },
              { name: "Cursor & Claude 3.5 Sonnet", category: "ai" },
              { name: "Prometheus & Grafana", category: "security" },
              { name: "Jenkins CI/CD", category: "cloud" },
              { name: "JUnit 5 & Mockito (TDD)", category: "testing" }
            ].map((tech, idx) => (
              <span key={idx} className={`tech-matrix-chip chip-${tech.category}`}>
                {tech.name}
              </span>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 5: BOTTOM 4K EXECUTIVE CTA BANNER
           ========================================================= */}
        <section className="executive-cta-4k">
          <div className="cta-4k-backdrop"></div>
          <div className="cta-4k-content">
            <span className="cta-tag">DIRECT CANDIDATE CONNECT</span>
            <h2>Looking to Scale Your Distributed Systems?</h2>
            <p>
              Available for Senior Java Software Engineer, Distributed Systems, and High-Throughput Backend roles. Relocation ready from Indore, India.
            </p>
            <div className="cta-4k-buttons">
              <Link to="/visitor-pass" className="btn-electric-primary">
                <span>🎫 Recruiter Pass & Dashboard</span>
                <FaArrowRight className="btn-arrow" />
              </Link>
              <Link to="/contact" className="btn-electric-secondary">
                <span>📬 Get In Touch Directly</span>
              </Link>
              <a
                href="https://www.linkedin.com/in/durgashankarpatra-java-developer"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-electric-secondary"
              >
                <FaLinkedin style={{ marginRight: 8 }} /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
