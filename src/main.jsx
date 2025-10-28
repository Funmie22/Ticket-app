import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLanding from "./pages/AppLanding";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import TicketsPage from "./pages/Tickets/TicketsPage";
import "./styles/index.css";
import { isAuthenticated } from "./utils/auth";

function Protected({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login?reason=expired" replace />;
  }
  return children;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLanding />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<Protected><Dashboard /></Protected>}
        />
        <Route
          path="/tickets"
          element={<Protected><TicketsPage /></Protected>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
