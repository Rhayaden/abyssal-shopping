import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import classes from "./Authentication.module.css";
import { useEffect } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import AuthForm from "./AuthForm";

function Authentication() {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (data?.token) {
      navigate("/");
    }
  }, [data, navigate]);

  let hasError = false;
  let message;
  if (data) {
    if (data.error) {
      hasError = true;
      message = <li>{data.error}</li>;
    } else if (data.message) {
      hasError = true;
      const errorList = data.message;
      const errors = errorList.map((err, index) => {
        return <li key={index}>{err}</li>;
      });
      message = errors;
    }
  }

  return (
    <>
      <div className={classes["form-control"]}>
        <h1 style={{ fontFamily: "Pacifico" }}>Abyss</h1>
        <h2>{isLogin ? "Welcome back" : "Create your account"}</h2>
        {isSubmitting && <LoadingSpinner />}
        {hasError && !isSubmitting && (
          <ul className={classes.error}>{message}</ul>
        )}
        <AuthForm />
        {isLogin && <p>Don't you have an account ?</p>}
        {isLogin && <Link to="?mode=signup">Create an Account</Link>}
        {!isLogin && <p>Do you have an account ?</p>}
        {!isLogin && <Link to="?mode=login">Login</Link>}
      </div>
    </>
  );
}

export default Authentication;
