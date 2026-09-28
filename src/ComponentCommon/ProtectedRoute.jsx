import { Navigate } from "react-router-dom";
import { getSociety } from "../utils/society";

function ProtectedRoute({ children, role }) {
  // Get logged-in user from localStorage
  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Society was removed by Super Admin - force a fresh login
  if (user.role !== "superadmin" && !getSociety(user.societyId)) {
    localStorage.removeItem("loggedInUser");
    return <Navigate to="/login" replace />;
  }

  // Role does not match
  if (user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Everything is correct
  return children;
}

export default ProtectedRoute;
