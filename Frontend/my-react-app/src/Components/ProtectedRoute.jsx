// ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token"); // Student token
  const adminToken = localStorage.getItem("adminToken"); // ✅ Admin token
  const location = useLocation();
  const role = localStorage.getItem("role");

  // ✅ If URL contains 'admin', check adminToken
  if (location.pathname.startsWith("/admin")) {
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken || role !== "admin") {
      return <Navigate to="/admin-login" replace />;
    }
    console.log(role);

    return <Outlet />;
  }

  // ✅ Otherwise check student token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
