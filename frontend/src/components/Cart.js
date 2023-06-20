import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { cartActions } from "../store/cart-slice";
import { orderActions } from "../store/order-slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearCart } from "../util/clear-cart";
import Modal from "../UI/Modal";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const cartProducts = useSelector((state) => state.cart.items);
  const hasEnoughStock = useSelector((state) => state.cart.hasEnoughStock);
  const cartTotal = useSelector((state) => state.cart.total);
  const token = localStorage.getItem("token");

  const orderHandler = () => {
    if (!hasEnoughStock) {
      setHasError(true);
      return;
    }

    const orderItems = cartProducts.map((i) => {
      return {
        _id: i._id,
        title: i.title,
        price: i.price,
        stock: i.stock,
        quantity: i.quantity,
      };
    });

    const token = localStorage.getItem("token");
    const order = {
      items: orderItems,
      totalPrice: cartTotal.toFixed(2),
    };
    if (token) {
      dispatch(orderActions.order(order));
      const orderRequest = async () => {
        const res = await fetch("http://localhost:8080/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(order),
        });
        if (res.status === 500) {
          setIsSuccess(false);
          setHasError(true);
          const resData = await res.json();
          throw new Error(`${resData.message}`);
        }
        return res.json();
      };
      orderRequest();
      setIsSuccess(true);

      dispatch(cartActions.clearCart());
      clearCart();
    } else {
      navigate("/auth?mode=login");
    }
  };

  const navigateHandler = () => {
    navigate("/orders?page=1");
    setIsSuccess(false);
  };

  const closeHandler = () => {
    setIsSuccess(false);
    setHasError(false);
    dispatch(cartActions.enoughStock());
  };

  return (
    <>
      {(isSuccess || hasError) && (
        <Modal onClose={closeHandler}>
          <div className={classes.wrapper}>
            <div
              className={`${isSuccess && classes.success} ${
                hasError && classes.failed
              }`}
            >
              {isSuccess && (
                <i className="fa-sharp fa-solid fa-circle-check fa-2xl"></i>
              )}
              {hasError && <i className="fa-solid fa-circle-xmark fa-2xl"></i>}
            </div>
            <p>
              {isSuccess ? (
                <p>Your order has been received.</p>
              ) : (
                <p>Your order could not be received.</p>
              )}
            </p>
            <p>
              {isSuccess ? (
                <p>Would you like to check your orders ?</p>
              ) : (
                <>
                  <p>The products in your cart might be out of stock.</p>
                  <p>Please try again.</p>
                </>
              )}
            </p>
          </div>
          <div className={classes.actions}>
            {isSuccess && <button onClick={navigateHandler}>Yes</button>}
            {isSuccess && <button onClick={closeHandler}>No</button>}
            {hasError && <button onClick={closeHandler}>OK</button>}
          </div>
        </Modal>
      )}
      {cartProducts.length === 0 && (
        <div className={classes["no-product"]}>
          <h1>
            {token ? "Your cart is empty" : "Please login to access your cart"}
          </h1>
        </div>
      )}
      {cartProducts.length > 0 && (
        <h1 className={classes.total}>Total: $ {cartTotal.toFixed(2)}</h1>
      )}
      {cartProducts.length > 0 && (
        <div className={classes.order}>
          <button className={classes.btn} onClick={orderHandler}>
            Order Now
          </button>
        </div>
      )}
      <div className={classes.items}>
        <ul>
          {cartProducts.map((product) => (
            <CartItem
              key={product._id}
              _id={product._id}
              title={product.title}
              image={product.image}
              description={product.description}
              price={product.price}
              stock={product.stock}
              quantity={product.quantity}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Cart;
