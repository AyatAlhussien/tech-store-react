import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return (
      <section className="profile-page">
        <div className="profile-card">
          <h1>Unauthorized</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      </section>
    );
  }

  return children;
}

export default ProtectedRoute;