import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/auth?mode=login" />;
  } else {
    return props.children;
  }
}

export default ProtectedRoute;
