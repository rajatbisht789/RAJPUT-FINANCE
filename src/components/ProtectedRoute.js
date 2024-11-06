import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const userData = JSON.parse(localStorage.getItem("loggedUserData"));

  if (!userData) {
    // If there's no user data in localStorage, redirect to login
    return <Navigate to="/" replace />;
  }

  if (requiredRole === "admin" && !userData.admin) {
    // If the route requires an admin role, and the user is not an admin, redirect
    return <Navigate to="/active-loan" replace />;
  }

  if (requiredRole === "user" && userData.admin) {
    // If the route is for non-admin users only, and the user is an admin, restrict access
    return <Navigate to="/admin" replace />;
  }

  // Allow access if conditions are met
  return children;
};

export default ProtectedRoute;
