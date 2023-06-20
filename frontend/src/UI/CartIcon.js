import { useSelector } from "react-redux";
import classes from "./CartIcon.module.css";

function CartIcon() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems.map((item) => item.quantity);
  const totalQuantity = cartQuantity.reduce(
    (first, others) => +first + +others
  );
  return <div className={classes.icon}>{+totalQuantity}</div>;
}

export default CartIcon;
