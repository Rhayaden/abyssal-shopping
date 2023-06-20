import classes from "./ProductDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useRef, useState } from "react";
import CartItem from "../Cart/CartItem";
import DeleteItem from "./DeleteItem";
import AddCartActions from "../Cart/AddCartActions";

function ProductDetail({ data }) {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.prodQuantity);
  const [changed, setChanged] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const qtyRef = useRef();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const selectedCartItem = cartItems.find((i) => i._id === data._id);

  const addToCartHandler = () => {
    setChanged(true);
    setTimeout(() => {
      setChanged(false);
    }, 500);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 500);

    if (!token) {
      return;
    }

    dispatch(
      cartActions.addToCart({
        _id: data._id,
        title: data.title,
        image: data.image,
        description: data.description,
        price: data.price,
        stock: data.stock,
        quantity: +quantity,
      })
    );
  };

  const closeHandler = () => {
    setIsDeleting(false);
  };

  return (
    <>
      {isDeleting && <DeleteItem item={data} onClose={closeHandler} />}
      {changed && (
        <div style={{ maxWidth: "0px", maxHeight: "0px", display: "none" }}>
          <CartItem />
        </div>
      )}
      <div className={classes.details}>
        <h1>{data.title}</h1>
        <div className={classes.image}>
          <img src={`${"http://localhost:8080/" + data.image}`} />
        </div>
        <div className={classes.info}>
          <p>
            <span>Price:</span> $ {data.price}
          </p>
          <p>
            <span>Description:</span> {data.description}
          </p>
          <p>
            <span>Added by:</span> {data.addedByUser}
          </p>
          {data.stock <= 10 && (
            <p style={{ fontWeight: "bold", marginTop: "0.25rem" }}>
              {data.stock == 0
                ? "This product currently not available"
                : `Only ${data.stock} left in stock`}
            </p>
          )}
          {userId !== data.addedBy && <AddCartActions item={data} />}
          {userId !== data.addedBy && (
            <button
              className={`${classes.btn} ${
                isAdded && token ? classes.added : ""
              } ${isAdded && !token ? classes.failed : ""} `}
              onClick={addToCartHandler}
              disabled={
                data.stock == 0 ||
                selectedCartItem?.stock <= selectedCartItem?.quantity ||
                quantity >
                  selectedCartItem?.stock - selectedCartItem?.quantity ||
                +qtyRef.current?.value > data.stock ||
                +qtyRef.current?.value === 0 ||
                isAdded
              }
            >
              {isAdded ? (
                <>
                  <i className="fa-solid fa-cart-arrow-down fa-fw"></i>Added to
                  Cart
                </>
              ) : (
                <>
                  <i className="fa-solid fa-cart-arrow-down fa-fw"></i> Add to
                  Cart
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
