import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, userProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Force password change only if not already on that page
  if (
    userProfile?.needsPasswordChange &&
    location.pathname !== "/change-password"
  ) {
    return <Navigate to="/change-password" replace />;
  }

  return children;
};

export default ProtectedRoute;