import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin" />
      </div>
    );
  }

  const isAdmin = role === "admin";

  if (!isAdmin) {
    // If not admin, redirect to admin login or home
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
