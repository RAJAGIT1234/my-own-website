import React from "react";
import "../styles/ProjectManager.css";

export default function ProjectManager() {
  const projects = [
    { id: 1, name: "Portfolio Website", status: "Completed" },
    { id: 2, name: "E-commerce App", status: "In Progress" },
    { id: 3, name: "Blog Platform", status: "Completed" },
  ];

  return (
    <div className="manager-container">
      <h1>Project Manager</h1>
      <table className="manager-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
