import classes from "./DeleteItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../store/product-slice";
import { cartActions } from "../../store/cart-slice";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../UI/Modal";

function DeleteItem(props) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedCartItem = cartItems.find((i) => i._id === props.item._id);

  const deleteProductHandler = () => {
    dispatch(productActions.deleteProduct(props.item._id));
    if (cartItems.length > 0) {
      dispatch(cartActions.deleteFromCart(props.item._id));
    }
    const token = localStorage.getItem("token");
    const deleteFromDB = async () => {
      const res = await fetch(
        "http://localhost:8080/prod/delete-product/" + props.item._id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return res.json();
    };
    const deleteFromCart = async () => {
      const res = await fetch(
        "http://localhost:8080/cart/delete-from-cart/" + props.item._id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            price: props.item.price,
            quantity: selectedCartItem?.quantity,
          }),
        }
      );
      return res.json();
    };
    deleteFromDB();
    if (selectedCartItem) {
      deleteFromCart();
    }
    if (pathname === "/my-products") {
      navigate(0);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <Modal onClose={props.onClose}>
        <p style={{ color: "white", textAlign: "center" }}>Are you sure ?</p>
        <div className={classes["delete-actions"]}>
          <button className={classes.del} onClick={deleteProductHandler}>
            Yes
          </button>
          <button className={classes.cancel} onClick={props.onClose}>
            No
          </button>
        </div>
      </Modal>
    </>
  );
}

export default DeleteItem;
