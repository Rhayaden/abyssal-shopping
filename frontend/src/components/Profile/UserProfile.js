import { Link } from "react-router-dom";
import classes from "./UserProfile.module.css";
import AccountInfo from "./AccountInfo";
import ResetPassword from "../../pages/ResetPassword";
import Messages from "../../pages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../store/profile-slice";

function UserProfile() {
  const info = useSelector((state) => state.profile.isInfo);
  const changePass = useSelector((state) => state.profile.isChangePass);
  const inbox = useSelector((state) => state.profile.isInbox);
  const dispatch = useDispatch();

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
      <div className={classes.profile}>
        <ul className={classes.sidebar}>
          <h1 style={{ fontFamily: "Pacifico" }}>Abyss</h1>
          <li>
            <Link to="/profile?account-information" onClick={infoHandler}>
              <i className="fa-solid fa-user fa-fw"></i>
              Account Details
            </Link>
          </li>
          <li>
            <Link to="/profile?change-password" onClick={changePassHandler}>
              <i className="fa-solid fa-pen-to-square fa-fw"></i> Change
              Password
            </Link>
          </li>
          <li>
            <Link to="/profile?messages" onClick={inboxHandler}>
              <i className="fa-solid fa-envelope fa-fw"></i>
              Inbox
            </Link>
          </li>
        </ul>
        {info && <AccountInfo />}
        {changePass && <ResetPassword />}
        {inbox && <Messages />}
      </div>
    </>
  );
}
export default UserProfile;
