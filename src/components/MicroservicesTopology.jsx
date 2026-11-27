import React, { useState } from "react";
import {
  FaServer,
  FaNetworkWired,
  FaDatabase,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMicrochip,
  FaBolt,
  FaProjectDiagram,
  FaHeartbeat
} from "react-icons/fa";
import { SiApachekafka, SiRedis, SiSpringboot, SiPostgresql } from "react-icons/si";

const TOPOLOGY_NODES = [
  {
    id: "gateway",
    label: "Spring Cloud Gateway",
    role: "Edge Routing & Perimeter Security",
    icon: <FaShieldAlt />,
    color: "cyan",
    ip: "10.0.1.12:8080",
    metrics: {
      rps: "8,240 RPS",
      latency: "14ms",
      uptime: "99.99%",
      threads: "Reactive Netty Workers",
      activeFilters: "JWT Validator, Token Bucket RateLimiter"
    },
    status: "HEALTHY",
    description: "Perimeter ingress router handling SSL termination, JWT token verification via Keycloak, and rate-limiting 8,000+ RPS."
  },
  {
    id: "loan-service",
    label: "Loan Core Microservice",
    role: "Java 21 / Spring Boot 3 Engine",
    icon: <SiSpringboot />,
    color: "green",
    ip: "10.0.2.45:8081",
    metrics: {
      rps: "5,800 RPS",
      latency: "28ms",
      uptime: "99.99%",
      threads: "10,000 Virtual Threads",
      circuitBreaker: "CLOSED (0 trips)"
    },
    status: "HEALTHY",
    description: "Core business microservice running on Java 21 Virtual Threads (Project Loom). Processes business logic without platform thread exhaustion."
  },
  {
    id: "kafka-cluster",
    label: "Apache Kafka Broker Mesh",
    role: "Event-Driven Distributed Streaming",
    icon: <SiApachekafka />,
    color: "purple",
    ip: "10.0.4.10:9092",
    metrics: {
      throughput: "2.4M msgs/day",
      partitions: "16 Partitions balanced",
      consumerLag: "< 50 msgs",
      dlqStatus: "Active (0 poison pills)",
      acks: "acks=all"
    },
    status: "HEALTHY",
    description: "High-scale event log maintaining strict partition ordering, idempotent consumers, and automated Dead Letter Queue failover."
  },
  {
    id: "redis-l2",
    label: "Redis L2 Distributed Cache",
    role: "Sub-Millisecond In-Memory Store",
    icon: <SiRedis />,
    color: "pink",
    ip: "10.0.3.88:6379",
    metrics: {
      hitRatio: "94.8% Hit Ratio",
      latency: "1.4ms",
      dbOffload: "45% Query Reduction",
      jitterTTL: "Active (±10% stampede guard)",
      p99: "75ms achieved"
    },
    status: "HEALTHY",
    description: "Multi-tier caching cluster offloading heavy read queries from the database, reducing p99 latency from 420ms to 75ms."
  },
  {
    id: "aurora-db",
    label: "AWS Aurora PostgreSQL",
    role: "ACID Relational Storage Tier",
    icon: <SiPostgresql />,
    color: "gold",
    ip: "10.0.5.20:5432",
    metrics: {
      connections: "Healthy (HikariCP 40/50)",
      cpuLoad: "34% Steady",
      replicationLag: "12ms (Multi-AZ)",
      storage: "Encrypted at Rest (KMS)"
    },
    status: "HEALTHY",
    description: "Primary transactional data store with Read Replicas, optimized HikariCP connection pooling, and automated failover."
  },
  {
    id: "otel-telemetry",
    label: "OpenTelemetry / Prometheus",
    role: "Distributed Observability Mesh",
    icon: <FaHeartbeat />,
    color: "blue",
    ip: "10.0.6.99:4317",
    metrics: {
      spansRecorded: "18.2M Spans/day",
      dashboards: "Grafana 10.2",
      alerts: "0 Active Incidents",
      traceCoverage: "100% Distributed Trace"
    },
    status: "HEALTHY",
    description: "End-to-end distributed trace collector correlating request spans across Spring Gateway, Kafka consumers, and DB queries."
  }
];

export default function MicroservicesTopology() {
  const [selectedNodeId, setSelectedNodeId] = useState("loan-service");

  const selectedNode = TOPOLOGY_NODES.find((n) => n.id === selectedNodeId) || TOPOLOGY_NODES[1];

  return (
    <section className="topology-section">
      <div className="section-header-4k">
        <span className="section-kicker">
          <FaProjectDiagram style={{ marginRight: 6 }} /> DISTRIBUTED TOPOLOGY MAP
        </span>
        <h2>Interactive Microservices Architecture Mesh</h2>
        <p>
          Click any microservice node below to inspect live real-time simulated telemetry,
          traffic concurrency, connection pools, and resilience states.
        </p>
      </div>

      <div className="topology-canvas-card">
        {/* Ambient Top Light Beam */}
        <div className="topol-ambient-beam"></div>

        {/* Live Network Health Banner */}
        <div className="topol-status-bar">
          <div className="topol-status-left">
            <span className="topol-live-pulse"></span>
            <span className="topol-network-text">AWS VPC: 10.0.0.0/16 • PROD MESH STATUS: ALL SYSTEMS NOMINAL</span>
          </div>
          <div className="topol-status-tags">
            <span className="topol-tag">Virtual Threads: Active</span>
            <span className="topol-tag gold">Kafka Partitions: 16/16</span>
            <span className="topol-tag green">p99 Latency: 75ms</span>
          </div>
        </div>

        {/* Interactive Visual Nodes Grid */}
        <div className="topol-nodes-grid">
          {TOPOLOGY_NODES.map((node) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <button
                key={node.id}
                type="button"
                className={`topol-node-card ${node.color} ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedNodeId(node.id)}
              >
                <div className="node-glow-halo"></div>
                <div className="node-card-top">
                  <div className="node-icon-box">{node.icon}</div>
                  <span className="node-status-pill">
                    <span className="status-dot"></span> {node.status}
                  </span>
                </div>
                <div className="node-card-info">
                  <h4 className="node-title">{node.label}</h4>
                  <span className="node-role">{node.role}</span>
                  <span className="node-ip">{node.ip}</span>
                </div>
                {isSelected && <div className="node-active-bar"></div>}
              </button>
            );
          })}
        </div>

        {/* Selected Node Telemetry Inspector */}
        <div className="topol-inspector-panel">
          <div className="inspector-header">
            <div className="inspector-title-wrap">
              <span className={`inspector-badge ${selectedNode.color}`}>NODE INSPECTOR</span>
              <h3>{selectedNode.label}</h3>
              <span className="inspector-ip">({selectedNode.ip})</span>
            </div>
            <div className="inspector-health-badge">
              <FaCheckCircle style={{ color: "#34d399", marginRight: 6 }} />
              Spring Boot Actuator: UP (200 OK)
            </div>
          </div>

          <p className="inspector-desc">{selectedNode.description}</p>

          <div className="inspector-metrics-grid">
            {Object.entries(selectedNode.metrics).map(([key, val], idx) => {
              // Convert camelCase to title
              const formattedLabel = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase());
              return (
                <div key={idx} className="inspector-metric-card">
                  <span className="metric-label">{formattedLabel}</span>
                  <span className="metric-value">{val}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
