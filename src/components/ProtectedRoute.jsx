import { Navigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children }) => {
  const { isAuthorized, isLoading } = useUsers();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
