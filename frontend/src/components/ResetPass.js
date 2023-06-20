import { Form } from "react-router-dom";
import classes from "./ResetPass.module.css";

function ResetPass() {
  const submitHandler = () => {
    //send email to reset password
    return;
  };
  return (
    <>
      <Form
        className={`${classes.form} ${classes["reset-form"]}`}
        onSubmit={submitHandler}
      >
        <label htmlFor="email">Please enter your email address</label>
        <input type="email" id="email" name="email" required />
        <button>Change Password</button>
      </Form>
    </>
  );
}

export default ResetPass;
