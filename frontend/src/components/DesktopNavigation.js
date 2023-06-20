import { useContext, useState } from "react";
import ProductDropdown from "../UI/ProductDropdown";
import AuthDropdown from "../UI/AuthDropdown";
import UserDropdown from "../UI/UserDropdown";
import classes from "./MainNavigation.module.css";
import { NavLink, Link } from "react-router-dom";
import CartIcon from "../UI/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../util/auth-context";
import { profileActions } from "../store/profile-slice";

function DesktopNavigation() {
  const authCtx = useContext(AuthContext);
  const isAuth = authCtx.isAuthenticated;
  const [openProdDropdown, setOpenProdDropdown] = useState(false);
  const [openAuthDropdown, setOpenAuthDropdown] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const openProdDropdownHandler = () => {
    setOpenProdDropdown(true);
  };
  const keepProdOpenDropdownHandler = () => {
    setOpenProdDropdown(true);
  };
  const closeProdDropDownHandler = () => {
    setOpenProdDropdown(false);
  };
  const openAuthDropdownHandler = () => {
    setOpenAuthDropdown(true);
  };
  const keepAuthOpenDropdownHandler = () => {
    setOpenAuthDropdown(true);
  };
  const closeAuthDropDownHandler = () => {
    setOpenAuthDropdown(false);
  };
  const openUserDropdownHandler = () => {
    setOpenUserDropdown(true);
  };
  const keepUserOpenDropdownHandler = () => {
    setOpenUserDropdown(true);
  };
  const closeUserDropDownHandler = () => {
    setOpenUserDropdown(false);
  };
  const infoHandler = () => {
    dispatch(profileActions.close());
    dispatch(profileActions.openInfo());
  };
  const scrollTopHandler = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <header className={classes["desktop-header"]}>
        <nav className={classes["desktop-nav"]}>
          <NavLink to="/" onClick={scrollTopHandler}>
            <h1 style={{ textDecoration: "underline" }}>Abyss</h1>
          </NavLink>
          <ul>
            <li>
              <NavLink
                to="/products?page=1"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-products?page=1"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                onMouseOver={openProdDropdownHandler}
                onMouseLeave={closeProdDropDownHandler}
              >
                My Shop <i className="fa-solid fa-chevron-down"></i>
              </NavLink>
              {openProdDropdown && (
                <ProductDropdown
                  onMouseOver={keepProdOpenDropdownHandler}
                  onMouseLeave={closeProdDropDownHandler}
                />
              )}
            </li>
            {isAuth && (
              <li>
                <NavLink
                  to="/orders?page=1"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <i className="fa-solid fa-file-invoice"></i> My Orders
                </NavLink>
              </li>
            )}
          </ul>
          <ul>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </NavLink>
            </li>
            {cartItems.length > 0 && <CartIcon />}
            <li>
              <Link
                to={isAuth ? "/profile?account-information" : "auth?mode=login"}
                onClick={infoHandler}
                onMouseOver={
                  isAuth ? openUserDropdownHandler : openAuthDropdownHandler
                }
                onMouseLeave={
                  isAuth ? closeUserDropDownHandler : closeAuthDropDownHandler
                }
              >
                <div className={classes.auth}>
                  <i className="fa-solid fa-user"></i>
                </div>
              </Link>
              {!isAuth && openAuthDropdown && (
                <AuthDropdown
                  onMouseOver={keepAuthOpenDropdownHandler}
                  onMouseLeave={closeAuthDropDownHandler}
                />
              )}
              {isAuth && openUserDropdown && (
                <UserDropdown
                  onMouseOver={keepUserOpenDropdownHandler}
                  onMouseLeave={closeUserDropDownHandler}
                />
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default DesktopNavigation;
