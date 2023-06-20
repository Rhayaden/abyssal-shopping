import { Form } from "react-router-dom";
import classes from "./ResetPass.module.css";

function ResetPass() {
  const submitHandler = () => {
    //change password
    return;
  };
  return (
    <>
      <Form className={classes.form} onSubmit={submitHandler}>
        <label htmlFor="email">Password</label>
        <input type="password" id="password" name="password" required />
        <label htmlFor="email">New password</label>
        <input type="password" id="new-password" name="new-password" required />
        <label htmlFor="email">Confirm new password</label>
        <input
          type="password"
          id="confirm-new-password"
          name="confirm-new-password"
          required
        />
        <button>Change Password</button>
      </Form>
    </>
  );
}

export default ResetPass;
