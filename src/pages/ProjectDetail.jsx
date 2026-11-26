import React from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetail(){
  const { id } = useParams();
  return (
    <div>
      <h1>Project #{id}</h1>
      <p>Case study: problem, your role, architecture, tech stack, results.</p>
    </div>
  );
}
