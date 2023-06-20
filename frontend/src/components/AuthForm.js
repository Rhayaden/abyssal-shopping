import { Form, Link, useNavigation, useSearchParams } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { useState } from "react";

function AuthForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  let method = "POST";
  if (!isLogin) {
    method = "PUT";
  }
  const checkHandler = () => {
    setIsChecked((prevState) => !prevState);
  };
  return (
    <>
      <Form method={method} className={classes["auth-form"]}>
        {!isLogin && <label htmlFor="username">Username</label>}
        {!isLogin && (
          <input type="text" id="username" name="username" required />
        )}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        {isLogin && (
          <Link to="/reset-password" style={{ textAlign: "end", marginTop: 0 }}>
            Forgot your password ?
          </Link>
        )}
        {!isLogin && <label htmlFor="confirmPassword">Confirm Password</label>}
        {!isLogin && (
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
        )}
        {!isLogin && (
          <div className={classes.checkbox}>
            <input type="checkbox" onClick={checkHandler} /> I agree with terms
            of service
          </div>
        )}
        <div className={classes.actions}>
          <button
            className={classes.btn}
            disabled={isSubmitting || (!isLogin && !isChecked)}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
