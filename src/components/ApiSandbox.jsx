import React, { useState } from "react";
import {
  FaPlay,
  FaTerminal,
  FaCheckCircle,
  FaExchangeAlt,
  FaBolt,
  FaCopy,
  FaCheck,
  FaCode
} from "react-icons/fa";

const API_ENDPOINTS = [
  {
    id: "disburse",
    method: "POST",
    path: "/api/v1/loans/disburse",
    tag: "Apache Kafka + Saga",
    title: "Idempotent Loan Event Disbursal",
    desc: "Publishes a disburse event to Kafka cluster with unique deduplication key. Coordinates Saga orchestrator with 0 duplicate debits.",
    defaultPayload: JSON.stringify(
      {
        transactionId: "TX-9982410-KAFKA",
        applicantId: "APP-40192",
        amount: 250000.0,
        currency: "INR",
        disbursementChannel: "NEFT_INSTANT"
      },
      null,
      2
    ),
    simulatedResponse: {
      status: 200,
      statusText: "OK (Event Accepted)",
      latency: "44ms",
      headers: {
        "X-Trace-Id": "otel-98fe8102-aws-prod",
        "X-Kafka-Partition": "Partition-07 (Offset: 994821)",
        "X-Virtual-Thread": "VirtualThread[#10492]",
        "X-Idempotency-Status": "UNIQUE_KEY_STORED_REDIS"
      },
      body: {
        statusCode: 200,
        message: "Loan disbursement event successfully ingested into Kafka topic.",
        transactionReference: "TX-9982410-KAFKA",
        kafkaMetadata: {
          topic: "loan-disbursed-events",
          partition: 7,
          offset: 994821,
          acks: "ALL_BROKERS_COMMITTED"
        },
        sagaState: "ORCHESTRATION_STARTED",
        systemAvailability: "99.99%"
      }
    }
  },
  {
    id: "cache-lookup",
    method: "GET",
    path: "/api/v1/cache/accounts/99812/balance",
    tag: "Redis L2 In-Memory",
    title: "Multi-Tier Low-Latency Balance Query",
    desc: "Fetches live loan balance using Cache-Aside pattern. Drops p99 latency from 420ms to 75ms with 94.8% cache hit ratio.",
    defaultPayload: null,
    simulatedResponse: {
      status: 200,
      statusText: "OK (Cache Hit)",
      latency: "1.4ms",
      headers: {
        "X-Trace-Id": "otel-33a7891-redis-cluster",
        "X-Cache-Tier": "L2_REDIS_CLUSTER_HIT",
        "X-p99-Optimization": "75ms achieved",
        "X-DB-Offload": "45% read load bypassed"
      },
      body: {
        accountId: "99812",
        accountHolder: "Enterprise Client A",
        currentOutstanding: 142500.5,
        availableLimit: 857499.5,
        cacheMetadata: {
          cacheHit: true,
          lookupDurationMs: 1.4,
          ttlRemainingSeconds: 3240,
          antiStampedeJitter: "ACTIVE_10_PERCENT"
        }
      }
    }
  },
  {
    id: "actuator-health",
    method: "GET",
    path: "/actuator/health",
    tag: "Spring Boot 3 Telemetry",
    title: "Cluster Health & Liveness Probe",
    desc: "Production actuator probe verifying Java 21 Virtual Threads, Kafka cluster readiness, Redis connectivity, and Aurora DB pool.",
    defaultPayload: null,
    simulatedResponse: {
      status: 200,
      statusText: "OK (All Systems UP)",
      latency: "6ms",
      headers: {
        "Content-Type": "application/vnd.spring-boot.actuator.v3+json",
        "X-Virtual-Threads-Enabled": "true (Project Loom)",
        "X-Cluster-Region": "ap-south-1 (AWS Mumbai)"
      },
      body: {
        status: "UP",
        components: {
          kafkaCluster: {
            status: "UP",
            details: { brokerCount: 3, leaderElection: "NORMAL", consumerLag: 12 }
          },
          redisCache: {
            status: "UP",
            details: { clusterState: "HEALTHY", hitRatio: "94.8%" }
          },
          dbHikariPool: {
            status: "UP",
            details: { activeConnections: 12, idleConnections: 28, maxPoolSize: 50 }
          },
          virtualThreads: {
            status: "UP",
            details: { activeVirtualThreads: 8240, memoryUsageMB: 142 }
          }
        }
      }
    }
  }
];

export default function ApiSandbox() {
  const [selectedEndpointId, setSelectedEndpointId] = useState("disburse");
  const [isLoading, setIsLoading] = useState(false);
  const [executedResponse, setExecutedResponse] = useState(API_ENDPOINTS[0].simulatedResponse);
  const [copied, setCopied] = useState(false);

  const activeEndpoint = API_ENDPOINTS.find((e) => e.id === selectedEndpointId) || API_ENDPOINTS[0];

  const handleSendRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setExecutedResponse(activeEndpoint.simulatedResponse);
      setIsLoading(false);
    }, 450);
  };

  const handleSelectEndpoint = (endpoint) => {
    setSelectedEndpointId(endpoint.id);
    setExecutedResponse(endpoint.simulatedResponse);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(executedResponse.body, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="api-sandbox-section">
      <div className="section-header-4k">
        <span className="section-kicker">
          <FaTerminal style={{ marginRight: 6 }} /> ENTERPRISE API PLAYGROUND
        </span>
        <h2>Live Microservice REST API Sandbox</h2>
        <p>
          Test simulated production endpoints built with Spring Boot 3.x, Apache Kafka, and Redis.
          Click "Send Request" to inspect live response headers, tracing spans, and JSON payloads.
        </p>
      </div>

      <div className="api-sandbox-card">
        {/* Ambient Top Glow */}
        <div className="sandbox-ambient-beam"></div>

        {/* Endpoint Selector Tabs */}
        <div className="api-endpoint-tabs">
          {API_ENDPOINTS.map((ep) => {
            const isSelected = ep.id === selectedEndpointId;
            return (
              <button
                key={ep.id}
                type="button"
                className={`api-tab-btn ${isSelected ? "active" : ""}`}
                onClick={() => handleSelectEndpoint(ep)}
              >
                <span className={`method-badge ${ep.method.toLowerCase()}`}>{ep.method}</span>
                <span className="tab-path">{ep.path}</span>
                <span className="tab-tag">{ep.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Request Execution Bar */}
        <div className="api-exec-bar">
          <div className="api-url-display">
            <span className={`method-pill ${activeEndpoint.method.toLowerCase()}`}>
              {activeEndpoint.method}
            </span>
            <span className="api-base-url">https://api.durgashankar.dev</span>
            <span className="api-endpoint-path">{activeEndpoint.path}</span>
          </div>

          <button
            type="button"
            className="btn-send-request"
            onClick={handleSendRequest}
            disabled={isLoading}
          >
            <FaPlay className={isLoading ? "pulse-icon" : ""} style={{ marginRight: 8 }} />
            <span>{isLoading ? "Executing..." : "Send Request"}</span>
          </button>
        </div>

        {/* API Description */}
        <div className="api-desc-strip">
          <span className="desc-title">{activeEndpoint.title}:</span> {activeEndpoint.desc}
        </div>

        {/* Request & Response Split Screen */}
        <div className="api-split-screen">
          {/* Left: Request Parameters / Body */}
          <div className="api-req-col">
            <div className="api-col-header">
              <span className="col-label">
                <FaCode style={{ marginRight: 6 }} /> REQUEST PAYLOAD (JSON)
              </span>
              <span className="col-meta">Content-Type: application/json</span>
            </div>
            <div className="api-code-editor">
              {activeEndpoint.defaultPayload ? (
                <pre className="code-pre">
                  <code>{activeEndpoint.defaultPayload}</code>
                </pre>
              ) : (
                <div className="no-payload-notice">
                  <span>ℹ️ No Request Body Required for {activeEndpoint.method} endpoint.</span>
                  <span className="sub-notice">Headers and Path Parameters will be forwarded automatically.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Live Response & Telemetry */}
          <div className="api-res-col">
            <div className="api-col-header">
              <div className="res-status-wrap">
                <span className="status-badge-pill green">
                  <span className="status-dot green"></span>
                  {executedResponse.status} {executedResponse.statusText}
                </span>
                <span className="latency-badge">
                  <FaBolt style={{ marginRight: 4, color: "#facc15" }} />
                  Latency: {executedResponse.latency}
                </span>
              </div>
              <button
                type="button"
                className="btn-copy-json"
                onClick={handleCopy}
                title="Copy JSON Response"
              >
                {copied ? <FaCheck style={{ color: "#34d399" }} /> : <FaCopy />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Custom Telemetry Headers */}
            <div className="res-headers-strip">
              {Object.entries(executedResponse.headers).map(([hKey, hVal], i) => (
                <div key={i} className="header-pill">
                  <span className="header-key">{hKey}:</span>
                  <span className="header-val">{hVal}</span>
                </div>
              ))}
            </div>

            {/* Response JSON Body */}
            <div className="api-code-editor res-editor">
              <pre className="code-pre">
                <code>{JSON.stringify(executedResponse.body, null, 2)}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
