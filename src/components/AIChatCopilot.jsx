import React, { useState, useEffect, useRef } from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaBolt,
  FaCopy,
  FaCheck,
  FaDownload,
  FaLinkedin,
  FaRedo,
  FaBrain,
  FaMicrochip
} from "react-icons/fa";
import "../styles/aiCopilot.css";

const KNOWLEDGE_BASE = [
  {
    triggers: ["kafka", "8000", "rps", "throughput", "scale", "streaming", "load"],
    title: "High-Throughput Kafka Scaling (8,000+ RPS)",
    response: `In production, I architected high-throughput event streaming with **Apache Kafka** handling **8,000+ RPS** and over **2.4 Million events daily** with zero message loss.

**Key Architectural Decisions:**
1. **Partition Strategy:** Distributed traffic across 16 partitions per topic aligned with consumer instances for parallel execution without hotspotting.
2. **Idempotent Consumers:** Implemented unique transaction deduplication IDs in Redis to prevent duplicate debit/processing under network retries.
3. **Dead Letter Queue (DLQ):** Configured Spring Kafka \`DefaultErrorHandler\` with exponential backoff (3 retries) and dead-letter routing for poison-pill messages.
4. **Producer Tuning:** Optimized \`acks=all\`, \`compression.type=snappy\`, \`linger.ms=20\`, and \`batch.size=64KB\` to balance latency and throughput.`
  },
  {
    triggers: ["redis", "latency", "75ms", "420ms", "cache", "performance", "p99", "optimize"],
    title: "p99 Latency Drop (420ms ➔ 75ms) via Multi-tier Redis",
    response: `I led a mission-critical latency optimization that reduced **p99 response times from 420ms down to 75ms**, while offloading **45% of read pressure** from our primary PostgreSQL database.

**Techniques Implemented:**
1. **Multi-tier Caching:** L1 in-memory local caching (Caffeine) for ultra-hot static configs, backed by L2 Redis Cluster for distributed state.
2. **Cache-Aside Pattern:** Integrated RedisTemplate with reactive lookups and write-through cache invalidation hooks.
3. **Cache Stampede Prevention:** Applied randomized TTL jitter (±10%) and distributed Redis locks (\`SETNX\`) during cache misses to prevent thundering herd spikes.
4. **Serialization:** Replaced standard Java serialization with lightweight Jackson JSON/Kryo serializers to slash network payload size by 65%.`
  },
  {
    triggers: ["why hire", "hire", "fit", "strength", "senior", "durgashankar", "experience", "profile"],
    title: "Why Hire Durgashankar Patra?",
    response: `Here is why I can make an immediate, high-ROI impact on your engineering team:

1. **Production-Hardened Distributed Systems Expertise:** 4.5+ years designing enterprise backends, Kafka event pipelines, and Spring Boot microservices from scratch.
2. **Measurable Business Impact:** Built systems sustaining 8k RPS, achieved 99.99% uptime with Resilience4j circuit breakers, and cut latency by 82%.
3. **Modern Java 17/21 & Cloud Native:** Extensive experience with Virtual Threads (Project Loom), Spring Boot 3.x, Docker, Kubernetes, and AWS (ECS, RDS, S3).
4. **AI-Accelerated Engineering:** Daily power user of Claude 3.5 Sonnet & Cursor IDE to accelerate delivery velocity while enforcing strict OWASP and concurrency quality gates.
5. **Ready to Relocate:** Based in Indore, actively open to relocating across India or working in global teams.`
  },
  {
    triggers: ["ai", "sdlc", "cursor", "claude", "copilot", "genai", "prompt"],
    title: "AI-Augmented Software Engineering Workflow",
    response: `I actively integrate GenAI into my day-to-day software development lifecycle (SDLC) to multiply velocity without compromising security:

1. **Architecture Spikes & Prototyping:** Using Cursor IDE and Claude 3.5 Sonnet to scaffold complex Spring Cloud microservices and event schemas in hours instead of days.
2. **Automated Unit & Concurrency Testing:** Generating comprehensive JUnit 5, Mockito, and Testcontainers suites with 92%+ branch coverage and edge-case simulation.
3. **Automated Vulnerability & OWASP Audit:** Running AI-assisted code reviews to detect SQL injections, race conditions, memory leaks, and thread deadlocks before SonarQube CI/CD gates.
4. **System Architecture Specs:** Prompt engineering structured OpenAPI 3.0 specs and AsyncAPI event contracts.`
  },
  {
    triggers: ["saga", "transaction", "distributed transaction", "microservice", "spring boot", "spring"],
    title: "Saga Pattern & Distributed Microservices Architecture",
    response: `To solve distributed transactions without slow two-phase commit (2PC) locks, I implemented the **Saga Pattern (Orchestration-based)** across our microservices:

1. **State Machine Orchestrator:** A centralized Spring Boot coordinator tracks multi-step workflows (e.g. Order Created ➔ Payment Captured ➔ Inventory Reserved).
2. **Compensating Actions:** If payment fails downstream, compensating events are dispatched across Kafka to rollback previously committed states automatically.
3. **Resilience4j Integration:** Protected inter-service REST and OpenFeign calls with circuit breakers, rate limiters, and graceful fallbacks.
4. **Observability:** Distributed tracing with OpenTelemetry, Prometheus, and Grafana to track trace IDs across all service hops.`
  },
  {
    triggers: ["resume", "download", "contact", "email", "phone", "location", "notice"],
    title: "Contact & Resume Summary",
    response: `**Durgashankar Patra** — Senior Java Software Engineer
- **Experience:** 4.5+ Years in Distributed Systems & Microservices
- **Core Stack:** Java 17/21, Spring Boot 3.x, Apache Kafka, Redis, AWS, PostgreSQL
- **Email:** durgashankarpatra457@gmail.com
- **LinkedIn:** [linkedin.com/in/durgashankar-patra-b2092120b](https://www.linkedin.com/in/durgashankar-patra-b2092120b/)
- **Location:** Indore, India (Actively Open to Relocate)

You can download my full verified executive PDF resume directly from the button below!`
  }
];

export default function AIChatCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I'm Durgashankar's AI Architecture Copilot. Ask me anything about his 4.5+ years of distributed systems experience, 8,000+ RPS Kafka scaling, Redis latency drops, or why he's a great fit for your engineering team!",
      timestamp: "Just now"
    }
  ]);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-copilot", handleOpen);
    return () => window.removeEventListener("open-ai-copilot", handleOpen);
  }, []);

  const handleSend = (userQuery) => {
    const query = (userQuery || input).trim();
    if (!query) return;

    // Add user message
    const newMessages = [
      ...messages,
      {
        sender: "user",
        text: query,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // AI answer matching engine
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let matched = null;

      for (const item of KNOWLEDGE_BASE) {
        if (item.triggers.some((trigger) => qLower.includes(trigger))) {
          matched = item;
          break;
        }
      }

      let aiResponseText = "";
      if (matched) {
        aiResponseText = matched.response;
      } else {
        aiResponseText = `Thank you for asking about "${query}"! 

As a Senior Java Software Engineer with **4.5+ years of enterprise experience**, I specialize in:
- **Core Architecture:** Java 17/21, Spring Boot 3.x, Virtual Threads, and high-concurrency microservices.
- **Event Streaming:** Apache Kafka clusters sustaining 8,000+ RPS and 2.4M daily events with zero data loss.
- **Low-Latency Caching:** Multi-tier Redis architectures cutting p99 latency from 420ms to 75ms.
- **Cloud & DevOps:** AWS (ECS, RDS, S3), Docker, Kubernetes, and Keycloak IAM.
- **AI-Accelerated SDLC:** Power user of Claude 3.5 Sonnet & Cursor IDE for accelerated feature delivery.

Would you like to explore my **Kafka scaling architecture**, **Redis latency benchmarks**, or download my **Executive Resume**?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleReset = () => {
    setMessages([
      {
        sender: "ai",
        text: "Conversation refreshed. Ask me about Durgashankar's Kafka architecture, 75ms Redis caching, Java 21 microservices, or interview availability!",
        timestamp: "Just now"
      }
    ]);
  };

  const quickPrompts = [
    "⚡ How did he scale Kafka to 8,000+ RPS?",
    "💾 How did he reduce latency to 75ms with Redis?",
    "💼 Why hire Durgashankar as Senior Java Engineer?",
    "🤖 How does he leverage AI in backend SDLC?",
    "🛡️ Explain his Saga Pattern microservices"
  ];

  return (
    <>
      {/* Floating Trigger Pill Button */}
      <button
        type="button"
        className={`ai-trigger-fab ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Copilot"
        title="Chat with Durgashankar AI Copilot"
      >
        <span className="ai-fab-beacon">
          <span className="ai-fab-dot"></span>
        </span>
        <FaRobot className="ai-fab-icon" />
        <span className="ai-fab-text">Ask AI Copilot</span>
        <span className="ai-fab-chip">Java 21</span>
      </button>

      {/* Floating AI Chat Window Modal */}
      {isOpen && (
        <div className="ai-modal-container">
          <div className="ai-modal-window">
            {/* Ambient Laser Edge */}
            <div className="ai-modal-laser"></div>

            {/* Modal Header */}
            <div className="ai-modal-header">
              <div className="ai-header-left">
                <div className="ai-avatar-badge">
                  <FaBrain className="ai-avatar-icon" />
                  <span className="ai-online-beacon"></span>
                </div>
                <div>
                  <div className="ai-header-title">
                    Durgashankar AI Copilot
                    <span className="ai-version-pill">v2.4 GPT-4o</span>
                  </div>
                  <div className="ai-header-sub">
                    Trained on 4.5+ Yrs Java, Kafka, Redis & AWS Architecture
                  </div>
                </div>
              </div>
              <div className="ai-header-actions">
                <button
                  type="button"
                  className="ai-icon-btn"
                  onClick={handleReset}
                  title="Clear conversation"
                >
                  <FaRedo />
                </button>
                <button
                  type="button"
                  className="ai-icon-btn close-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close AI Copilot"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Quick Action Prompt Chips */}
            <div className="ai-prompts-bar">
              <span className="ai-prompts-label">QUICK RECRUITER PROMPTS:</span>
              <div className="ai-chips-scroll">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    className="ai-prompt-chip"
                    onClick={() => handleSend(prompt.replace(/^[^\w]+/, ""))}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Body */}
            <div className="ai-messages-body">
              {messages.map((msg, index) => (
                <div key={index} className={`ai-message-row ${msg.sender}`}>
                  {msg.sender === "ai" && (
                    <div className="ai-msg-avatar">
                      <FaMicrochip />
                    </div>
                  )}
                  <div className="ai-msg-bubble">
                    <div className="ai-msg-content">
                      {msg.text.split("\n\n").map((para, pIdx) => {
                        // Check if paragraph contains markdown bold
                        return (
                          <p key={pIdx} className="ai-para">
                            {para}
                          </p>
                        );
                      })}
                    </div>
                    <div className="ai-msg-meta">
                      <span>{msg.timestamp}</span>
                      {msg.sender === "ai" && (
                        <button
                          type="button"
                          className="ai-copy-btn"
                          onClick={() => handleCopy(msg.text, index)}
                          title="Copy response"
                        >
                          {copiedIdx === index ? <FaCheck /> : <FaCopy />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="ai-message-row ai">
                  <div className="ai-msg-avatar">
                    <FaMicrochip />
                  </div>
                  <div className="ai-msg-bubble typing-bubble">
                    <div className="ai-typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="ai-typing-text">Analyzing architectural patterns...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Resume & LinkedIn Direct Action Strip */}
            <div className="ai-action-footer-strip">
              <a
                href="/resume.pdf"
                download="Durgashankar_Patra_Resume.pdf"
                className="ai-footer-link"
              >
                <FaDownload style={{ marginRight: 6 }} /> Download Resume PDF
              </a>
              <a
                href="https://www.linkedin.com/in/durgashankar-patra-b2092120b/"
                target="_blank"
                rel="noreferrer"
                className="ai-footer-link"
              >
                <FaLinkedin style={{ marginRight: 6 }} /> Connect on LinkedIn
              </a>
            </div>

            {/* Input Bar */}
            <form
              className="ai-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                className="ai-input-field"
                placeholder="Ask about 8k RPS Kafka, 75ms Redis, Java 21, Spring Boot..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="ai-send-btn"
                disabled={!input.trim()}
                title="Send message"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
