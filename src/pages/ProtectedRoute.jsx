import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    if (isMounted && !isLogged) {
      // Check mounted state before navigating
      navigate("/sign-in");
    }

    return () => {
      isMounted = false;
    };
  }, [isLogged, navigate]);

  return children;
};

export default ProtectedRoute;
