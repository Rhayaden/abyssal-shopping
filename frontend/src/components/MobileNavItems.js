import { NavLink, Link, useNavigate } from "react-router-dom";
import classes from "./MobileNavItems.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../util/auth-context";
import MobileProductDropdown from "../UI/MobileProductDropdown";
import MobileProfileDropdown from "../UI/MobileProfileDropdown";

function MobileNavItems(props) {
  const [displayProduct, setDisplayProduct] = useState(false);
  const [displayProfile, setDisplayProfile] = useState(false);
  const authCtx = useContext(AuthContext);
  const isAuth = authCtx.isAuthenticated;
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const logoutHandler = () => {
    props.onClicked();
    localStorage.clear();
    navigate("/");
    navigate(0);
  };

  const productDropdownHandler = () => {
    setDisplayProduct(true);
    setDisplayProfile(false);
  };
  const profileDropdownHandler = () => {
    setDisplayProduct(false);
    setDisplayProfile(true);
  };
  return (
    <>
      <div className={classes["nav-items"]}>
        {isAuth && (
          <div className={classes["welcome-user"]}>
            <p>Welcome</p>
            <span>{username}</span>
          </div>
        )}
        <ul>
          <li>
            <NavLink to="/products" onClick={props.onClicked}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to={isAuth ? "" : "auth?mode=login"}
              onClick={!isAuth ? props.onClicked : productDropdownHandler}
              className={displayProduct ? classes.active : ""}
            >
              My Shop <i className="fa-solid fa-chevron-right"></i>
            </NavLink>
          </li>
          {isAuth && (
            <li>
              <NavLink to="/orders" onClick={props.onClicked}>
                <i className="fa-solid fa-file-invoice fa-fw"></i> My Orders
              </NavLink>
            </li>
          )}
          {!isAuth && (
            <li>
              <Link to="auth?mode=login" onClick={props.onClicked}>
                <i className="fa-solid fa-right-to-bracket fa-fw"></i> Login
              </Link>
            </li>
          )}
          {!isAuth && (
            <li>
              <Link to="auth?mode=signup" onClick={props.onClicked}>
                <i className="fa-solid fa-user-plus fa-fw"></i> Register
              </Link>
            </li>
          )}
          {isAuth && (
            <li>
              <NavLink
                onClick={profileDropdownHandler}
                className={displayProfile ? classes.active : ""}
              >
                <i className="fa-solid fa-user fa-fw"></i> My Profile{" "}
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li>
              <button onClick={logoutHandler}>
                <i className="fa-solid fa-right-to-bracket fa-rotate-180 fa-fw"></i>
                Logout
              </button>
            </li>
          )}
        </ul>
        <div>
          {displayProduct && (
            <MobileProductDropdown onClicked={props.onClicked} />
          )}

          {displayProfile && (
            <MobileProfileDropdown onClicked={props.onClicked} />
          )}
        </div>
      </div>
    </>
  );
}

export default MobileNavItems;
