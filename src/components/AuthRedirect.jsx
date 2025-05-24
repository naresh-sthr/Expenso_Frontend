// components/AuthRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return token ? null : children;
};

export default AuthRedirect;
