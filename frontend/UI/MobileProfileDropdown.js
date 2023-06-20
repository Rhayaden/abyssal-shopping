import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { profileActions } from "../store/profile-slice";

function MobileProductDropdown(props) {
  const dispatch = useDispatch();
  const infoHandler = () => {
    dispatch(profileActions.close());
    dispatch(profileActions.openInfo());
    props.onClicked();
  };

  const changePassHandler = () => {
    dispatch(profileActions.close());
    dispatch(profileActions.openChangePass());
    props.onClicked();
  };

  const inboxHandler = () => {
    dispatch(profileActions.close());
    dispatch(profileActions.openInbox());
    props.onClicked();
  };
  return (
    <>
      <ul>
        <li>
          <Link to="/profile" onClick={infoHandler}>
            <i className="fa-solid fa-user fa-fw"></i>
            Account Details
          </Link>
        </li>
        <li>
          <Link to="profile?change-password" onClick={changePassHandler}>
            <i className="fa-solid fa-pen-to-square fa-fw"></i> Change Password
          </Link>
        </li>
        <li>
          <Link to="profile?messages" onClick={inboxHandler}>
            <i className="fa-solid fa-envelope fa-fw"></i>
            Inbox
          </Link>
        </li>
      </ul>
    </>
  );
}

export default MobileProductDropdown;
