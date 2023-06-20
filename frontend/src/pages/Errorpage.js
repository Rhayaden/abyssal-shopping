import { Navigate, useLocation } from "react-router-dom";
import MainNavigation from "../components/Navigation/MainNavigation";
import Error from "../components/Error/Error";

function ErrorPage() {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");

  if (!token && pathname === "/my-products") {
    return <Navigate to="/auth?mode=login" />;
  }
  return (
    <>
      <MainNavigation />
      <Error />
    </>
  );
}

export default ErrorPage;
