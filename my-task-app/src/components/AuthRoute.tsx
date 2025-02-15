import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log("Unauthorized user");
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [auth, navigate]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default AuthRoute;
