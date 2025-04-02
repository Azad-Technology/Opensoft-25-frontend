import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        // Redirect based on user role
        if (user.role_type === "hr") {
          navigate("/admin/dashboard");
        } else {
          navigate("/employee/dashboard");
        }
      } else {
        // Not authenticated, redirect to login
        navigate("/login");
      }
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pattern">
      <div className="text-center animate-pulse-slow">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    </div>
  );
};

export default Index;
