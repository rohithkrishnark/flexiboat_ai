import React from "react";
import { Navigate } from "react-router-dom";

const AuthProtectedRoute = ({ children, allowedRoles }) => {
  const stored = localStorage.getItem("authUser");

  if (!stored) {
    return <Navigate to="/login" replace />;
  }

  let user = null;

  try {
    user = JSON.parse(atob(stored));
  } catch (err) {
    return <Navigate to="/login" replace />;
  }

  // ❌ no role or invalid
  if (!user?.logged_role) {
    return <Navigate to="/login" replace />;
  }

  // ❌ role mismatch
  if (!allowedRoles.includes(user.logged_role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AuthProtectedRoute;