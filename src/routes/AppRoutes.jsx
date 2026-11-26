import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import Resume from "../pages/Resume";
import VisitorPass from "../pages/VisitorPass";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Education from "../pages/Education";
import Experience from "../pages/Experience";
import Address from "../pages/Address";
import BlogManager from "../pages/BlogManager";
import ProjectManager from "../pages/ProjectManager";
import ProjectDetail from "../pages/ProjectDetail";
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/resume" element={<Resume />} />

      {/* Recruiter / Visitor Pass (Replaces old mock login) */}
      <Route path="/visitor-pass" element={<VisitorPass />} />
      <Route path="/login" element={<Navigate to="/visitor-pass" replace />} />

      {/* Protected Dashboard routes (Unlocked by Visitor Pass) */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/education"
        element={
          <PrivateRoute>
            <Education />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/experience"
        element={
          <PrivateRoute>
            <Experience />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/address"
        element={
          <PrivateRoute>
            <Address />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/blogs"
        element={
          <PrivateRoute>
            <BlogManager />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/projects"
        element={
          <PrivateRoute>
            <ProjectManager />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
