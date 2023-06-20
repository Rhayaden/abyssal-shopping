import { Link } from "react-router-dom";
import classes from "./Dropdown.module.css";

function AuthDropdown(props) {
  return (
    <>
      <div
        className={`${classes.dropdown} ${classes["auth-dropdown"]}`}
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}
      >
        <ul>
          <li>
            <Link to="auth?mode=login">
              <i className="fa-solid fa-right-to-bracket fa-fw"></i> Login
            </Link>
          </li>
          <li>
            <Link to="auth?mode=signup">
              <i className="fa-solid fa-user-plus fa-fw"></i> Register
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AuthDropdown;
