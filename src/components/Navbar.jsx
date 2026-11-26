import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/components.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, visitor, resetPass } = useContext(AuthContext);

  // Update status on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExitPass = () => {
    resetPass();
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="logo-text" onClick={() => setMenuOpen(false)}>
            MyPortfolio
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          role="button"
          tabIndex={0}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Links */}
        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          {!isLoggedIn ? (
            <>
              <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
              <li><NavLink to="/projects" onClick={() => setMenuOpen(false)}>Projects</NavLink></li>
              <li><NavLink to="/resume" onClick={() => setMenuOpen(false)}>Resume</NavLink></li>
              <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
              <li>
                <Link to="/visitor-pass" className="btn-primary" onClick={() => setMenuOpen(false)}>
                  🎫 Recruiter Pass
                </Link>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
              <li><NavLink to="/projects" onClick={() => setMenuOpen(false)}>Projects</NavLink></li>
              <li><NavLink to="/resume" onClick={() => setMenuOpen(false)}>Resume</NavLink></li>
              <li><NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>📊 Dashboard</NavLink></li>

              {/* Visitor Identity Pill */}
              <li className="visitor-identity-item">
                <span className="visitor-nav-pill" title={`Role: ${visitor.role || "Visitor"}`}>
                  👤 {visitor.name?.split(" ")[0] || "Visitor"}
                </span>
              </li>

              <li>
                <button
                  className="btn-exit-pass"
                  onClick={handleExitPass}
                  title="Exit visitor session"
                >
                  Exit Pass
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
