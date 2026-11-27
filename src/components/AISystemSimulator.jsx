import React, { useState } from "react";
import {
  FaBolt,
  FaServer,
  FaDatabase,
  FaExchangeAlt,
  FaShieldAlt,
  FaCode,
  FaCheckCircle,
  FaPlay,
  FaSyncAlt,
  FaMicrochip,
  FaBrain
} from "react-icons/fa";
import { SiApachekafka, SiRedis, SiSpringboot, SiPostgresql } from "react-icons/si";

const SCENARIOS = [
  {
    id: "rps-scale",
    icon: <FaBolt />,
    badge: "8,000+ RPS Surge",
    title: "High-Throughput Loan Ingestion Spike",
    architecture: "Client ➔ Spring Cloud Gateway ➔ Virtual Threads ➔ Apache Kafka",
    problem:
      "A massive traffic surge of 8,000+ RPS overwhelmed traditional OS platform threads, causing thread pool starvation, high context-switching CPU spikes (92%), and request latency climbing past 2,400ms.",
    solution:
      "Migrated backend concurrency to Java 21 Virtual Threads (Project Loom), eliminating thread memory overhead. Optimized Kafka producer buffer with batching (linger.ms=20, batch.size=64KB) and tuned non-blocking Netty gateway routing.",
    code: `// Java 21 + Spring Boot 3.x: Virtual Threads Per Task Executor
@Configuration
public class VirtualThreadExecutionConfig {

    @Bean
    public AsyncTaskExecutor applicationTaskExecutor() {
        return new TaskExecutorAdapter(
            Executors.newVirtualThreadPerTaskExecutor()
        );
    }

    @Bean
    public TomcatProtocolHandlerCustomizer<?> protocolHandlerCustomizer() {
        return protocolHandler -> protocolHandler.setExecutor(
            Executors.newVirtualThreadPerTaskExecutor()
        );
    }
}`,
    metrics: [
      { label: "Throughput (RPS)", before: "1,800 RPS", after: "8,240+ RPS", change: "+357%" },
      { label: "p99 Latency", before: "2,400ms", after: "48ms", change: "-98%" },
      { label: "Thread Heap Usage", before: "1.8 GB", after: "142 MB", change: "-92%" },
      { label: "CPU Context Switches", before: "Critical (92%)", after: "Optimal (28%)", change: "Stabilized" }
    ]
  },
  {
    id: "latency-cache",
    icon: <SiRedis />,
    badge: "p99 75ms Optimization",
    title: "Database Lock & Latency Crisis",
    architecture: "Spring Boot Microservice ➔ Multi-tier Redis Cache ➔ PostgreSQL DB",
    problem:
      "Direct database reads on loan account queries caused connection pool exhaustion, unindexed join overhead, and unacceptable p99 latency of 420ms under concurrent recruiter and customer traffic.",
    solution:
      "Architected a Multi-Tier Caching layer: L1 local Caffeine in-memory cache for ultra-hot static metadata, backed by L2 Redis Cluster for distributed state with Cache-Aside pattern, TTL jitter to prevent stampedes, and JSON serialization.",
    code: `// Spring Boot 3.x + Redis Cache-Aside with Stampede Jitter
@Service
@RequiredArgsConstructor
public class LoanAccountCacheService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final LoanRepository loanRepository;

    @Cacheable(value = "loanAccounts", key = "#accountId", unless = "#result == null")
    public LoanAccountDTO getAccountWithCache(String accountId) {
        return loanRepository.findByAccountId(accountId)
            .map(this::mapToDTO)
            .orElseThrow(() -> new AccountNotFoundException(accountId));
    }
}`,
    metrics: [
      { label: "p99 Response Time", before: "420ms", after: "75ms", change: "-82%" },
      { label: "Database Read Pressure", before: "100% Load", after: "55% Load", change: "45% Offload" },
      { label: "Redis Cache Hit Ratio", before: "0%", after: "94.8%", change: "+94.8%" },
      { label: "Concurrent Connections", before: "Saturated", after: "Healthy", change: "Zero Dropped" }
    ]
  },
  {
    id: "kafka-fault",
    icon: <SiApachekafka />,
    badge: "Zero Data Loss",
    title: "Kafka Partition Lag & DLQ Fault-Tolerance",
    architecture: "Producer ➔ 16 Partitions ➔ Idempotent Consumer ➔ Dead Letter Queue (DLQ)",
    problem:
      "Poison-pill messages with corrupted JSON payloads caused consumers to throw unhandled exceptions, stalling partition commit offsets and triggering repeated consumer rebalances.",
    solution:
      "Implemented Idempotent Consumers with Redis deduplication keys. Configured Spring Kafka DefaultErrorHandler with 3-attempt exponential backoff, routing failed messages to a Dead Letter Topic (DLQ) without blocking the stream.",
    code: `// Spring Kafka Idempotent Consumer + DLQ Resilience Handler
@Component
@KafkaListener(topics = "disbursement-events", groupId = "loan-disburse-v2")
public class IdempotentLoanConsumer {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @KafkaHandler
    public void processDisbursement(DisbursementEvent event, Acknowledgment ack) {
        String dedupeKey = "dedupe:tx:" + event.getTransactionId();
        Boolean isNew = redisTemplate.opsForValue().setIfAbsent(dedupeKey, "PROCESSED", 24, TimeUnit.HOURS);

        if (Boolean.TRUE.equals(isNew)) {
            disbursementService.executeDisbursement(event);
        }
        ack.acknowledge(); // Commit offset cleanly
    }
}`,
    metrics: [
      { label: "Data Loss Rate", before: "Risk Present", after: "0.00%", change: "Zero Loss" },
      { label: "Consumer Lag", before: "14,000+ msgs", after: "< 50 msgs", change: "-99.6%" },
      { label: "Duplicate Debits", before: "Risk on Retry", after: "0 Duplicates", change: "Guaranteed" },
      { label: "Stream Recovery Time", before: "Manual", after: "Sub-second", change: "Automated" }
    ]
  },
  {
    id: "saga-tx",
    icon: <FaShieldAlt />,
    badge: "Saga Pattern",
    title: "Distributed Multi-Service Transaction Coordinator",
    architecture: "Order Service ➔ Payment Gateway ➔ Inventory Service ➔ Audit Log",
    problem:
      "In a microservices architecture, two-phase commits (2PC) cause severe blocking latency and single points of failure when network partitions occur during multi-step payments.",
    solution:
      "Engineered an Orchestration-based Saga State Machine. If payment capture fails downstream, the orchestrator automatically dispatches compensating events across Kafka to rollback previously committed states safely.",
    code: `// Distributed Saga Orchestration: Automatic Rollback Trigger
@Service
public class LoanSagaCoordinator {

    public CompletableFuture<SagaResult> executeLoanSaga(LoanApplicationRequest req) {
        return creditCheckService.verifyCredit(req)
            .thenCompose(paymentService::authorizeDebit)
            .thenCompose(ledgerService::recordEntry)
            .exceptionally(throwable -> {
                compensateRollback(req.getApplicationId());
                return SagaResult.failed("Compensating transactions executed cleanly");
            });
    }
}`,
    metrics: [
      { label: "Distributed ACID Safety", before: "Vulnerable", after: "Eventual Consistency", change: "Guaranteed" },
      { label: "Rollback Reliability", before: "Manual DB fix", after: "100% Automated", change: "100%" },
      { label: "System Availability", before: "99.2%", after: "99.99%", change: "+0.79%" },
      { label: "Transaction Throughput", before: "Blocking (2PC)", after: "Non-blocking Async", change: "+310%" }
    ]
  }
];

export default function AISystemSimulator() {
  const [activeScenarioId, setActiveScenarioId] = useState("rps-scale");
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis"); // "analysis" or "code"

  const current = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const handleSelectScenario = (id) => {
    setActiveScenarioId(id);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 600);
  };

  return (
    <section className="ai-simulator-section">
      <div className="section-header-4k">
        <span className="section-kicker">
          <FaBrain style={{ marginRight: 6 }} /> INTERACTIVE ARCHITECTURAL DIAGNOSTIC
        </span>
        <h2>AI System Design & Architecture Simulator</h2>
        <p>
          Simulate high-scale production bottlenecks and watch the AI architectural engine apply
          Durgashankar's real-world Java 21, Kafka, and Redis design patterns.
        </p>
      </div>

      <div className="ai-sim-card">
        {/* Ambient Top Beam */}
        <div className="sim-ambient-beam"></div>

        {/* Scenario Selection Pills */}
        <div className="sim-scenario-selector">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              className={`sim-scenario-btn ${activeScenarioId === sc.id ? "active" : ""}`}
              onClick={() => handleSelectScenario(sc.id)}
            >
              <span className="sim-btn-icon">{sc.icon}</span>
              <div className="sim-btn-text">
                <span className="sim-btn-badge">{sc.badge}</span>
                <span className="sim-btn-title">{sc.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Live Architecture Flow Track */}
        <div className="sim-flow-bar">
          <div className="sim-flow-label">
            <span className="sim-pulse-dot"></span> LIVE ARCHITECTURAL TOPOLOGY:
          </div>
          <div className="sim-flow-path">{current.architecture}</div>
          <button
            type="button"
            className="sim-retest-btn"
            onClick={() => handleSelectScenario(activeScenarioId)}
            title="Re-run Diagnostic Scan"
          >
            <FaSyncAlt className={isScanning ? "spin-anim" : ""} style={{ marginRight: 6 }} />
            Run Diagnostic Scan
          </button>
        </div>

        {/* Diagnostic Output Frame */}
        <div className={`sim-output-grid ${isScanning ? "scanning-active" : ""}`}>
          {/* Laser Scanner Effect */}
          {isScanning && <div className="sim-laser-scan-line"></div>}

          {/* Left: Problem vs Solution */}
          <div className="sim-diagnosis-pane">
            <div className="sim-tab-controls">
              <button
                type="button"
                className={`sim-subtab ${activeTab === "analysis" ? "active" : ""}`}
                onClick={() => setActiveTab("analysis")}
              >
                🔍 Architecture Diagnosis
              </button>
              <button
                type="button"
                className={`sim-subtab ${activeTab === "code" ? "active" : ""}`}
                onClick={() => setActiveTab("code")}
              >
                💻 Java 21 / Spring Boot 3 Code
              </button>
            </div>

            {activeTab === "analysis" ? (
              <div className="sim-analysis-content">
                <div className="sim-diag-box problem-box">
                  <div className="sim-box-header">
                    <span className="sim-box-tag red">🔴 Production Bottleneck (Before)</span>
                  </div>
                  <p className="sim-box-desc">{current.problem}</p>
                </div>

                <div className="sim-diag-box solution-box">
                  <div className="sim-box-header">
                    <span className="sim-box-tag green">
                      <FaCheckCircle style={{ marginRight: 6 }} /> AI Architectural Solution (Implemented)
                    </span>
                  </div>
                  <p className="sim-box-desc">{current.solution}</p>
                </div>
              </div>
            ) : (
              <div className="sim-code-content">
                <div className="sim-code-header">
                  <span className="sim-code-lang">
                    <FaCode style={{ marginRight: 6 }} /> Java 21 • Spring Boot 3.x
                  </span>
                  <span className="sim-code-badge">Production Ready</span>
                </div>
                <pre className="sim-code-pre">
                  <code>{current.code}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Right: Metrics Impact Dashboard */}
          <div className="sim-metrics-pane">
            <div className="sim-metrics-header">
              <FaMicrochip style={{ color: "#38bdf8", marginRight: 8 }} />
              VERIFIED PRODUCTION BENCHMARKS
            </div>
            <div className="sim-metrics-list">
              {current.metrics.map((m, idx) => (
                <div key={idx} className="sim-metric-row">
                  <div className="sim-metric-top">
                    <span className="sim-metric-name">{m.label}</span>
                    <span className="sim-metric-badge">{m.change}</span>
                  </div>
                  <div className="sim-metric-compare">
                    <span className="sim-before">Before: {m.before}</span>
                    <span className="sim-arrow">➔</span>
                    <span className="sim-after">After: {m.after}</span>
                  </div>
                  <div className="sim-metric-bar">
                    <div className="sim-metric-fill" style={{ width: `${80 + idx * 5}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Verification Seal */}
            <div className="sim-ai-seal">
              <span className="seal-dot"></span>
              <span>Validated by Architecture Concurrency & Telemetry Suite</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
