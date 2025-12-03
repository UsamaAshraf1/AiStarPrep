import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RoleGuard = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  let parsedUser = null;
  try {
    parsedUser = user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);
    localStorage.removeItem("user"); // Clear corrupted data
  }

  if (!token || !parsedUser) {
    return <Navigate to="/" replace />;
  }

  return parsedUser.role === allowedRole ? <Outlet /> : <Navigate to="/" replace />;
};

export default RoleGuard;
