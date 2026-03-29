import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthUser } from "../../constant/Constant";

const AuthProtectedRoute = ({ children, allowedRoles }) => {

  const user = getAuthUser(); // ✅ already decoded object



  // ❌ Not logged in
  if (!user || !user.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ❌ No role found
  if (!user.role) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  // ✅ Authorized
  return children;
};

export default AuthProtectedRoute;