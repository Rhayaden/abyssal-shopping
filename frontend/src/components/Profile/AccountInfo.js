import { Form } from "react-router-dom";
import classes from "./AccountInfo.module.css";

function AccountInfo() {
  const username = localStorage.getItem("username");
  const userEmail = localStorage.getItem("userEmail");

  const addAddressHandler = () => {
    //add address
    return;
  };
  return (
    <>
      <ul className={classes.info}>
        <li>
          <p className={classes.property}>Username:</p>
          <p className={classes.value}>{username}</p>
        </li>
        <li>
          <p className={classes.property}>Email:</p>{" "}
          <p className={classes.value}>{userEmail}</p>
        </li>
        <li>
          <p className={classes.property}>Address:</p>
          <p className={classes.value}>
            <Form onSubmit={addAddressHandler}>
              <textarea id="address" name="address" rows="5" />
              <button>Add Address</button>
            </Form>
          </p>
          <div className={classes.action}></div>
        </li>
      </ul>
    </>
  );
}
export default AccountInfo;
