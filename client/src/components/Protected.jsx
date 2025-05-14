import React from "react";
import { useAuth } from "../context/Auth";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const { user } = useAuth();

  // While user is being checked (initially null), show a loader
  if (user === null) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default Protected;
