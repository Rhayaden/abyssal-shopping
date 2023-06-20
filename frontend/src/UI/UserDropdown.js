import { Link, useNavigate } from "react-router-dom";
import classes from "./Dropdown.module.css";
import { useDispatch } from "react-redux";
import { profileActions } from "../store/profile-slice";
import { logout } from "../util/auth";

function UserDropdown(props) {
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  const infoHandler = () => {
    dispatch(profileActions.close());
    dispatch(profileActions.openInfo());
  };

  const changePassHandler = () => {
    dispatch(profileActions.close());
    dispatch(profileActions.openChangePass());
  };

  const inboxHandler = () => {
    dispatch(profileActions.close());
    dispatch(profileActions.openInbox());
  };
  return (
    <>
      <div
        className={`${classes.dropdown} ${classes["user-dropdown"]}`}
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}
      >
        <ul>
          <div className={classes["welcome-user"]}>
            <p>Welcome</p>
            <p style={{ fontSize: username?.length >= 9 ? "14px" : "15px" }}>
              {username}
            </p>
          </div>
          <li>
            <Link to="/profile?account-information" onClick={infoHandler}>
              <i className="fa-solid fa-user fa-fw"></i>
              Account Details
            </Link>
          </li>
          <li>
            <Link to="profile?change-password" onClick={changePassHandler}>
              <i className="fa-solid fa-pen-to-square"></i> Change Password
            </Link>
          </li>
          <li>
            <Link to="profile?messages" onClick={inboxHandler}>
              <i className="fa-solid fa-envelope fa-fw"></i>
              Inbox
            </Link>
          </li>
          <li>
            <button onClick={logoutHandler}>
              <i className="fa-solid fa-right-to-bracket fa-rotate-180 fa-fw"></i>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserDropdown;
