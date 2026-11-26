import React from "react";
import "../styles/Education.css";
import { FaGraduationCap, FaUniversity, FaAward, FaCalendarAlt } from "react-icons/fa";

export default function Education() {
  const educationList = [
    {
      degree: "Bachelor of Technology (B.Tech) – Computer Science & Engineering",
      institution: "Biju Patnaik University of Technology (BPUT), Odisha",
      college: "Satyasai Engineering College, Balasore",
      duration: "2016 – 2020",
      score: "69.13%",
      highlight: true,
      description: "Focused on Core Computer Science: Distributed Systems, Operating Systems, Data Structures & Algorithms, Database Management Systems, and Object-Oriented Software Engineering."
    },
    {
      degree: "Higher Secondary Certificate (Science, PCM)",
      institution: "Council of Higher Secondary Education (CHSE), Odisha",
      college: "L.N Mahavidyalaya, Jamsuli",
      duration: "2015 – 2016",
      score: "63.33%",
      highlight: false,
      description: "Physics, Chemistry, and Higher Mathematics foundation."
    },
    {
      degree: "Secondary School Examination (10th Standard)",
      institution: "Board of Secondary Education (BSE), Odisha",
      college: "Patrani High School, Tahalia",
      duration: "2013 – 2014",
      score: "84.17%",
      highlight: false,
      description: "Graduated with First Division and high academic distinction."
    }
  ];

  return (
    <div className="education-container">
      <div className="education-header">
        <h1>🎓 Educational Qualifications</h1>
        <p className="education-tagline">Academic foundation in Computer Science & Engineering</p>
      </div>

      <div className="education-list">
        {educationList.map((edu, index) => (
          <div key={index} className={`education-card ${edu.highlight ? "featured" : ""}`}>
            {edu.highlight && <div className="featured-pill">Primary Degree</div>}
            <div className="edu-top-row">
              <div className="edu-icon"><FaGraduationCap /></div>
              <div>
                <h2>{edu.degree}</h2>
                <p className="institution"><FaUniversity style={{ marginRight: 6 }} /> {edu.institution}</p>
                <p className="college-text">{edu.college}</p>
              </div>
            </div>

            <div className="edu-meta-row">
              <span><FaCalendarAlt style={{ marginRight: 6 }} /> {edu.duration}</span>
              <span className="edu-score-badge"><FaAward style={{ marginRight: 6 }} /> Score: {edu.score}</span>
            </div>

            <p className="edu-desc">{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
