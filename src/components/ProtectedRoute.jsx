import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = JSON.parse(sessionStorage.getItem("user")); // Get user from sessionStorage

  if (!user) {
    console.log("No user found, redirecting to login...");
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log(`Access denied for role: ${user.role}, redirecting to login...`);
    return <Navigate to="/" replace />;
  }

  return element; // Render the requested page
};

export default ProtectedRoute;
