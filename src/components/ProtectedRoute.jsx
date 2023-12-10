import { Navigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { ok } = useCart();

  if (!ok) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
