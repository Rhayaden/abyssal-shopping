import { useEffect, useRef, useState } from "react";
import classes from "./AddToCartActions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { cartActions } from "../store/cart-slice";

function AddCartActions({ item }) {
  const [qty, setQty] = useState(1);
  const quantity = useSelector((state) => state.cart.prodQuantity);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const qtyRef = useRef();
  const selectedCartItem = cartItems.find((i) => i._id === item._id);

  useEffect(() => {
    dispatch(cartActions.changeQty(qty));
  }, [qty]);

  const addQuantityHandler = () => {
    if (selectedCartItem) {
      if (quantity + 1 + selectedCartItem.quantity === selectedCartItem.stock) {
        setQty(quantity + 1);
      }
    }
    if (quantity < 10) {
      setQty(quantity + 1);
    }
    if (quantity == 10) {
      alert("Order Limit is 10");
    }

    if (item.stock == quantity + 1) {
      alert(
        `There are only ${item.stock} left of the product you want to add to the cart.`
      );
    }
  };
  const multipleIncreaseQtyHandler = () => {
    const enteredQty = qtyRef.current.value;
    if (enteredQty > item.stock) {
      if (selectedCartItem) {
        qtyRef.current.value = (
          selectedCartItem.stock - selectedCartItem.quantity
        ).toString();
        setQty(selectedCartItem.stock - selectedCartItem.quantity);
      } else {
        qtyRef.current.value = item.stock.toString();
        setQty(item.stock);
      }
      return alert(`Only ${item.stock} left in stock`);
    }
    setQty(+enteredQty);
  };
  const deleteProductHandler = () => {
    if (quantity > 1) {
      setQty(quantity - 1);
    } else {
      return;
    }
  };
  const changeQtyHandler = (event) => {
    event.target.value = event.target.value.replace(0, "");
    setQty(event.target.value);
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
          <i
            className={`${
              quantity === 1 ? classes.limit : ""
            } ${"fa-solid fa-minus"}`}
          ></i>
        </button>
        <Form onSubmit={multipleIncreaseQtyHandler}>
          <input
            type="number"
            step="1"
            min="1"
            max="10"
            ref={qtyRef}
            value={
              selectedCartItem
                ? quantity || selectedCartItem.quantity
                : quantity
            }
            onChange={changeQtyHandler}
            onKeyDown={preventDecimalHandler}
          />
        </Form>
        <button
          onClick={addQuantityHandler}
          disabled={
            item.stock <= quantity ||
            quantity >= selectedCartItem?.stock - selectedCartItem?.quantity
          }
        >
          <i
            className={`${
              quantity > 9 ||
              item.stock <= quantity ||
              quantity >= selectedCartItem?.stock - selectedCartItem?.quantity
                ? classes.limit
                : ""
            } ${"fa-solid fa-plus"}`}
          ></i>
        </button>
      </div>
    </>
  );
}

export default AddCartActions;
