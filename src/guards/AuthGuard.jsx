import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const token = localStorage.getItem("token"); 

  return token ? <Navigate to="/" replace /> : <Outlet />; // Redirect if logged in
};

export default AuthGuard;
