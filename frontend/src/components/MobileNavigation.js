import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useState } from "react";
import MobileNavItems from "./MobileNavItems";
import CartIcon from "../UI/CartIcon";
import { useSelector } from "react-redux";

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);
  const toggleMobileNav = () => {
    setIsOpen((prevState) => !prevState);
  };
  const closeMobileNav = () => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header className={classes["mobile-header"]}>
        <nav className={classes["mobile-nav"]}>
          <ul>
            <li>
              <button onClick={toggleMobileNav}>
                <i
                  className={
                    isOpen
                      ? "fa-solid fa-xmark fa-fw fa-xl"
                      : "fa-solid fa-bars fa-fw fa-xl"
                  }
                ></i>
              </button>
            </li>
            <li>
              <NavLink to="/" onClick={closeMobileNav}>
                <h1 style={{ textDecoration: "underline" }}>Abyss</h1>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                onClick={closeMobileNav}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <i className="fa-solid fa-cart-shopping fa-fw"></i>
              </NavLink>
            </li>
          </ul>
        </nav>
        {cartItems.length > 0 && <CartIcon />}
      </header>
      {isOpen && <MobileNavItems onClicked={toggleMobileNav} />}
    </>
  );
}

export default MobileNavigation;
