import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedAuth(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate(0);
    }
  });
  if (token) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
}

export default ProtectedAuth;
