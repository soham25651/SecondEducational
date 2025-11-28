// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx"; // ✅ make sure path is correct

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext); // ✅ access user from context

  // 1️⃣ User not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ User logged in but role not allowed → redirect to main page
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/main" replace />; // or redirect to "Not Authorized" page
  }

  // 3️⃣ User logged in and role allowed → render the component
  return children;
};

export default ProtectedRoute;
