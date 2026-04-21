import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthUser } from "../../constant/Constant";

const AuthProtectedRoute = ({ children, allowedRoles }) => {
  const user = getAuthUser();
  const location = useLocation();

  // ✅ 1. If no restriction → public route
  if (!allowedRoles) return children;

  // ✅ 2. Not logged in → go login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ 3. Role-based redirect (IMPORTANT FIX)
  const roleHomeMap = {
    admin: "/admin",
    fac: "/faculity",
    alumni: "/alumini",
    student: "/students",
  };

  // ✅ 4. If role NOT allowed → redirect to their own dashboard
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={roleHomeMap[user.role] || "/home"} replace />;
  }

  // ✅ 5. Authorized
  return children;
};

export default AuthProtectedRoute;
