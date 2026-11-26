// src/pages/BlogManager.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/BlogManager.css";

export default function BlogManager() {
  const { isLoggedIn } = useContext(AuthContext);

  // If the user is not logged in, redirect them to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const blogs = [
    { id: 1, title: "React Hooks Tips", date: "2025-09-01" },
    { id: 2, title: "Java Spring Boot Basics", date: "2025-08-20" },
    { id: 3, title: "Portfolio Design Tips", date: "2025-08-05" },
  ];

  return (
    <div className="manager-container">
      <h1>Blog Manager</h1>
      <ul className="blog-list">
        {blogs.map((b) => (
          <li key={b.id}>
            <strong>{b.title}</strong> - <em>{b.date}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
