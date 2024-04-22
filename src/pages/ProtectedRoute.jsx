import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLogged, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(isLoading, isLogged);

  useEffect(() => {
    // Check authentication status
    if (!isLogged) {
      // Redirect to login if not logged in
      navigate("/sign-in", { replace: true });
    }
  }, [isLogged, navigate]);

  return isLoading ? null : <>{children}</>;
};

export default ProtectedRoute;
