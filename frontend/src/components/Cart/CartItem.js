import { useDispatch, useSelector } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart-slice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CartActions from "./CartActions";

function CartItem(props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.product.items);
  const quantity = useSelector((state) => state.cart.prodQuantity);

  const selectedCartItem = cartItems.find((i) => i._id === props._id);
  const [qty, setQty] = useState(
    selectedCartItem ? selectedCartItem.quantity : +quantity
  );

  const cartProds = cartItems.map((i) => {
    return products.find((prod) => prod._id === i._id);
  });

  const prodQty = cartItems.map((i) => {
    return { _id: i._id, quantity: i.quantity };
  });

  //Last updated product info merged with product quantity in the cart
  const mergedArray = cartProds.map((i) => {
    return { ...i, ...prodQty.find((q) => q._id === i._id) };
  });

  //Check if cart has deleted products
  const filteredCart = mergedArray.filter(Boolean);

  useEffect(() => {
    if (filteredCart !== cartItems) {
      setQty(qty); //state stops redux to overwrite quantity
      dispatch(cartActions.replaceCart(filteredCart));
      filteredCart.map((i) => {
        return dispatch(cartActions.updateCart(i));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    //Stock check
    cartItems.map((i) => {
      if (i.stock < i.quantity) {
        return dispatch(cartActions.notEnoughStock());
      }
    });
  }, [cartProds]);

  const token = localStorage.getItem("token");
  const cart = async () => {
    const res = await fetch("http://localhost:8080/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(cartItems),
    });

    if (!res.ok) {
      const resData = await res.json();
      throw new Response(`${resData.message}`);
    }
    return res.json();
  };

  useEffect(() => {
    cart();
  }, [props.quantity, cartItems]);

  const deleteFromCartHandler = () => {
    if (cartItems.length === 1) {
      const token = localStorage.getItem("token");
      const clearCart = async () => {
        const res = await fetch("http://localhost:8080/cart/clear-cart", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        return res.json();
      };
      clearCart();
    }
    dispatch(cartActions.deleteFromCart(props._id));
  };

  return (
    <>
      <li className={classes.list}>
        <div className={classes.cart}>
          <Link to={`/products/${props._id}`}>
            <div className={classes.image}>
              <img
                src={`${"http://localhost:8080/" + props.image}`}
                alt={props.title}
              />
            </div>
            <div className={classes.content}>
              <p style={{ fontWeight: "bold" }}>{props.title}</p>
              <p>$ {props.price}</p>
              <p>x {props.quantity}</p>
              {props.stock <= 10 && (
                <p>
                  {props.stock == 0
                    ? "This product currently not available"
                    : `Only ${props.stock} left in stock`}
                </p>
              )}
            </div>
          </Link>
          <CartActions item={props} />
          <button
            className={classes["delete-button"]}
            onClick={deleteFromCartHandler}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </li>
    </>
  );
}

export default CartItem;
