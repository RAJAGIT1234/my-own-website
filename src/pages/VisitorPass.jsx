import React, { useState, useContext } from "react";
import "../styles/login.css";
import { AuthContext } from "../context/AuthContext";
import {
  FaIdCard,
  FaUser,
  FaPhoneAlt,
  FaBuilding,
  FaArrowRight,
  FaBolt,
  FaShieldAlt,
  FaBriefcase,
  FaCode
} from "react-icons/fa";

export default function VisitorPass() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    role: "Recruiter / HR"
  });
  const [loading, setLoading] = useState(false);
  const { issuePass } = useContext(AuthContext);

  const roleOptions = [
    { label: "👔 Recruiter / HR", value: "Recruiter / HR" },
    { label: "💻 Engineering Lead", value: "Engineering Lead" },
    { label: "🚀 Fellow Developer", value: "Developer / Peer" },
    { label: "👀 Guest Explorer", value: "General Visitor" }
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRoleSelect = (roleVal) => {
    setFormData({ ...formData, role: roleVal });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    setTimeout(() => {
      issuePass(formData);
      setLoading(false);
    }, 400);
  };

  const handleQuickGuest = () => {
    setLoading(true);
    setTimeout(() => {
      issuePass({
        name: "Guest Explorer",
        phone: "",
        company: "Direct Portfolio Visitor",
        role: "Guest Explorer"
      });
      setLoading(false);
    }, 300);
  };

  return (
    <div className="login-page">
      <div className="login-background"></div>
      <div className="login-card visitor-pass-card">
        {/* Pass Header */}
        <div className="pass-icon-badge">
          <FaIdCard />
        </div>
        <h2 className="login-title">Visitor & Recruiter Pass</h2>
        <p className="login-subtitle">
          Enter your name and contact info to explore Durgashankar Patra's full engineering dashboard and architecture metrics.
        </p>

        {/* Role Pills */}
        <div className="role-selector-block">
          <label className="input-field-label">I am visiting as:</label>
          <div className="role-pills-row">
            {roleOptions.map((r) => (
              <button
                type="button"
                key={r.value}
                className={`role-pill ${formData.role === r.value ? "active" : ""}`}
                onClick={() => handleRoleSelect(r.value)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="visitor-form">
          {/* Name Field */}
          <div className="pass-input-group">
            <label className="input-field-label">
              <FaUser style={{ marginRight: 6 }} /> Your Full Name / Recruiter Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Rahul Sharma"
              className="pass-input"
            />
          </div>

          {/* Phone Field */}
          <div className="pass-input-group">
            <label className="input-field-label">
              <FaPhoneAlt style={{ marginRight: 6 }} /> Contact Number / WhatsApp *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="e.g. +91 98765 43210"
              className="pass-input"
            />
          </div>

          {/* Company Field (Optional) */}
          <div className="pass-input-group">
            <label className="input-field-label">
              <FaBuilding style={{ marginRight: 6 }} /> Company / Organization (Optional)
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Amazon / Tech Startup"
              className="pass-input"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary pass-submit-btn"
            disabled={loading}
          >
            {loading ? "Issuing Pass..." : (
              <>
                Unlock Dashboard <FaArrowRight style={{ marginLeft: 8 }} />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Quick Guest Option */}
        <div className="divider-row">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="btn-quick-guest"
          onClick={handleQuickGuest}
          disabled={loading}
        >
          <FaBolt style={{ marginRight: 8, color: "#facc15" }} /> 1-Click Instant Guest Preview
        </button>

        {/* Security / Privacy reassurance */}
        <p className="privacy-note">
          <FaShieldAlt style={{ marginRight: 6, color: "#34d399" }} />
          Zero passwords required. Details are stored to personalize your candidate evaluation experience.
        </p>
      </div>
    </div>
  );
}
