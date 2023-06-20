import { useRef, useState } from "react";
import classes from "./CartActions.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { Form } from "react-router-dom";

function CartActions({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();
  const qtyRef = useRef();

  const addQuantityHandler = () => {
    if (item.quantity < 10) {
      dispatch(cartActions.addToCart({ ...item, quantity: 1 }));
      setQuantity(item.quantity + 1);
    }
    if (item.quantity == 10) {
      alert("Order Limit is 10");
    }

    if (item.stock == item.quantity + 1) {
      alert(
        `There are only ${item.stock} left of the product you want to add to the cart.`
      );
    }
  };
  const multipleIncreaseQtyHandler = () => {
    const enteredQty = qtyRef.current.value;
    if (enteredQty == 0) {
      setQuantity(+enteredQty + 1);
      return dispatch(
        cartActions.multipleQty({ ...item, quantity: +enteredQty + 1 })
      );
    }
    if (item.stock <= 10 && enteredQty > item.stock) {
      setQuantity(item.stock);
      dispatch(cartActions.multipleQty({ ...item, quantity: item.stock }));
      return alert(`Only ${item.stock} left in stock`);
    }
    dispatch(cartActions.multipleQty({ ...item, quantity: +enteredQty }));
    setQuantity(+enteredQty);
  };
  const deleteProductHandler = () => {
    dispatch(cartActions.removeFromCart(item._id));
    setQuantity(item.quantity - 1);
  };

  const changeQtyHandler = (event) => {
    event.target.value = event.target.value.replace(0, "");
    setQuantity(event.target.value);
  };
  const preventDecimalHandler = (event) => {
    if (event.key === "," || event.key === ".") {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className={classes.actions}>
        <button onClick={deleteProductHandler}>
          <i className="fa-solid fa-minus"></i>
        </button>
        <Form onChange={multipleIncreaseQtyHandler}>
          <input
            type="number"
            step="1"
            min="1"
            max="10"
            ref={qtyRef}
            value={quantity}
            onChange={changeQtyHandler}
            onKeyDown={preventDecimalHandler}
          />
        </Form>
        <button
          onClick={addQuantityHandler}
          disabled={item.stock <= item.quantity}
        >
          <i
            className={`${
              item.quantity > 9 || item.stock <= item.quantity
                ? classes.limit
                : ""
            } ${"fa-solid fa-plus"}`}
          ></i>
        </button>
      </div>
    </>
  );
}

export default CartActions;
