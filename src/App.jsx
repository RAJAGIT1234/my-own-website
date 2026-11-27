import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatCopilot from "./components/AIChatCopilot";
import "./styles/app.css";

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <AppRoutes />
      </main>
      <Footer />
      <AIChatCopilot />
    </div>
  );
}
