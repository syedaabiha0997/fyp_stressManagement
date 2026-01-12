import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  // Jab tak auth check ho raha ho
  if (authLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // Agar user login nahi hai → login page bhejo
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Agar login hai → page show karo
  return children;
};

export default ProtectedRoute;
