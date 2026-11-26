import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visitor, setVisitor] = useState({
    name: "",
    phone: "",
    company: "",
    role: "Recruiter"
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedPass = localStorage.getItem("visitor_pass");
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("username");

      if (storedPass) {
        const parsed = JSON.parse(storedPass);
        setVisitor(parsed);
        setIsLoggedIn(true);
      } else if (storedToken) {
        setVisitor({
          name: storedUser || "Guest Visitor",
          phone: "",
          company: "",
          role: "Guest"
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      setIsLoggedIn(false);
    }
  }, []);

  // Issue visitor pass
  const issuePass = (visitorData) => {
    const formatted = {
      name: visitorData.name || "Guest Visitor",
      phone: visitorData.phone || "",
      company: visitorData.company || "Direct Visitor",
      role: visitorData.role || "Recruiter / Hiring Manager",
      timestamp: new Date().toISOString()
    };

    localStorage.setItem("visitor_pass", JSON.stringify(formatted));
    localStorage.setItem("username", formatted.name);
    localStorage.setItem("token", "visitor-pass-active");

    setVisitor(formatted);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  // Reset/Exit visitor pass
  const resetPass = () => {
    localStorage.removeItem("visitor_pass");
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setVisitor({ name: "", phone: "", company: "", role: "" });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        visitor,
        username: visitor.name,
        issuePass,
        resetPass,
        login: (name) => issuePass({ name }),
        logout: resetPass
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
