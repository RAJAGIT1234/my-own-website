import React, { useState } from "react";
import {
  FaCheckCircle,
  FaBolt,
  FaEnvelope,
  FaDownload,
  FaLinkedin,
  FaFire,
  FaSlidersH,
  FaAward
} from "react-icons/fa";

const SKILL_CHECKLIST = [
  { id: "java", label: "Java 17 / 21 & Virtual Threads", weight: 15, proof: "Engineered high-concurrency microservices with Virtual Threads (Project Loom)." },
  { id: "spring", label: "Spring Boot 3.x & Spring Cloud Gateway", weight: 15, proof: "Architected enterprise REST backends, OpenFeign, and Resilience4j circuit breakers." },
  { id: "kafka", label: "Apache Kafka & Event Streaming (8k RPS)", weight: 15, proof: "Sustained 8,000+ RPS and 2.4M daily events with Idempotent consumers & DLQ." },
  { id: "redis", label: "Redis Caching & p99 Latency Drop (75ms)", weight: 15, proof: "Reduced p99 latency from 420ms to 75ms with Multi-tier L1/L2 Cache-Aside." },
  { id: "aws", label: "AWS Cloud Infrastructure (ECS, RDS, S3)", weight: 10, proof: "Production deployments on AWS ECS container tasks, Aurora DB, and IAM policies." },
  { id: "distributed", label: "Distributed Systems & Saga Pattern", weight: 10, proof: "Implemented orchestration-based Saga state machines with automated compensating rollbacks." },
  { id: "ai", label: "AI-Augmented SDLC (Cursor, Claude 3.5)", weight: 10, proof: "Power user of GenAI tools for rapid architecture prototyping & 92% unit test coverage." },
  { id: "relocate", label: "Actively Open to Relocate (Pan-India)", weight: 5, proof: "Currently in Indore, ready to relocate immediately across major tech hubs." },
  { id: "experience", label: "4.5+ Years Enterprise Backend Experience", weight: 5, proof: "Proven track record delivering scalable backends in Fintech & Enterprise retail." }
];

export default function RecruiterMatchCalculator() {
  const [selectedSkills, setSelectedSkills] = useState([
    "java",
    "spring",
    "kafka",
    "redis",
    "aws",
    "distributed"
  ]);

  const toggleSkill = (id) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== id));
    } else {
      setSelectedSkills([...selectedSkills, id]);
    }
  };

  const selectAll = () => {
    setSelectedSkills(SKILL_CHECKLIST.map((s) => s.id));
  };

  const clearAll = () => {
    setSelectedSkills([]);
  };

  // Calculate score
  const totalWeight = SKILL_CHECKLIST.reduce((acc, curr) => acc + curr.weight, 0);
  const earnedWeight = SKILL_CHECKLIST.filter((s) => selectedSkills.includes(s.id)).reduce(
    (acc, curr) => acc + curr.weight,
    0
  );
  const matchPercentage = Math.round((earnedWeight / totalWeight) * 100);

  const getMatchVerdict = (pct) => {
    if (pct >= 85) return { grade: "🔥 Exceptional Senior Engineer Fit", color: "#34d399", badge: "TOP 1% CANDIDATE" };
    if (pct >= 60) return { grade: "⚡ Strong Technical Fit", color: "#38bdf8", badge: "HIGH PRIORITY SHORTLIST" };
    if (pct >= 30) return { grade: "👍 Moderate Technical Fit", color: "#facc15", badge: "POTENTIAL FIT" };
    return { grade: "Select required skills above to evaluate fit", color: "#94a3b8", badge: "AWAITING INPUT" };
  };

  const verdict = getMatchVerdict(matchPercentage);

  return (
    <section className="matcher-section">
      <div className="section-header-4k">
        <span className="section-kicker">
          <FaSlidersH style={{ marginRight: 6 }} /> RECRUITER FIT CALCULATOR
        </span>
        <h2>Interactive Job Description (JD) Skill Matcher</h2>
        <p>
          Select the core technical competencies your engineering role requires to calculate
          Durgashankar's verified alignment score and evidence.
        </p>
      </div>

      <div className="matcher-card">
        {/* Ambient Top Glow */}
        <div className="matcher-ambient-beam"></div>

        <div className="matcher-grid">
          {/* Left: Interactive Checklist */}
          <div className="matcher-checklist-col">
            <div className="checklist-header">
              <span className="checklist-title">SELECT OPEN ROLE REQUIREMENTS:</span>
              <div className="checklist-actions">
                <button type="button" className="btn-chip-action" onClick={selectAll}>
                  Select All
                </button>
                <button type="button" className="btn-chip-action" onClick={clearAll}>
                  Reset
                </button>
              </div>
            </div>

            <div className="skills-checkbox-list">
              {SKILL_CHECKLIST.map((skill) => {
                const isChecked = selectedSkills.includes(skill.id);
                return (
                  <label
                    key={skill.id}
                    className={`skill-check-item ${isChecked ? "checked" : ""}`}
                    onClick={() => toggleSkill(skill.id)}
                  >
                    <div className="check-box-square">
                      {isChecked && <FaCheckCircle className="check-icon" />}
                    </div>
                    <div className="skill-check-text">
                      <span className="skill-name">{skill.label}</span>
                      <span className="skill-proof">{skill.proof}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Right: Live Match Scorecard */}
          <div className="matcher-scorecard-col">
            <div className="scorecard-box">
              <span className="scorecard-tag">{verdict.badge}</span>

              {/* Radial Dial Simulation */}
              <div className="score-dial-wrap">
                <div
                  className="score-circle-outer"
                  style={{
                    background: `conic-gradient(${verdict.color} ${matchPercentage * 3.6}deg, rgba(255, 255, 255, 0.08) 0deg)`
                  }}
                >
                  <div className="score-circle-inner">
                    <span className="score-pct-number" style={{ color: verdict.color }}>
                      {matchPercentage}%
                    </span>
                    <span className="score-pct-lbl">ROLE ALIGNMENT</span>
                  </div>
                </div>
              </div>

              <h4 className="verdict-title" style={{ color: verdict.color }}>
                {verdict.grade}
              </h4>

              <p className="verdict-summary">
                {matchPercentage >= 70
                  ? "Durgashankar possesses direct hands-on production experience in the core competencies selected, with proven enterprise benchmarks (8,000+ RPS, 75ms p99)."
                  : "Check additional criteria above to evaluate full alignment with your open Java / Distributed Systems role."}
              </p>

              {/* Fast-Track Interview CTA Buttons */}
              <div className="scorecard-ctas">
                <a
                  href="mailto:durgashankarpatra457@gmail.com?subject=Interview%20Invitation%20-%20Senior%20Java%20Software%20Engineer&body=Hi%20Durgashankar,%0A%0AWe%20reviewed%20your%20executive%20portfolio%20and%20would%20like%20to%20schedule%20a%20technical%20interview%20for%20our%20Senior%20Backend%20Engineer%20role.%0A%0ABest%20regards,"
                  className="btn-matcher-primary"
                >
                  <FaEnvelope style={{ marginRight: 8 }} />
                  <span>Schedule Technical Interview</span>
                </a>

                <a
                  href="/resume.pdf"
                  download="Durgashankar_Patra_Resume.pdf"
                  className="btn-matcher-secondary"
                >
                  <FaDownload style={{ marginRight: 8 }} />
                  <span>Download Executive Resume</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/durgashankar-patra-b2092120b/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-matcher-secondary"
                >
                  <FaLinkedin style={{ marginRight: 8 }} />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
