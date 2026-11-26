import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("token") || localStorage.getItem("visitor_pass");

  if (!isLoggedIn && !token) {
    return <Navigate to="/visitor-pass" replace />;
  }

  return children;
}
