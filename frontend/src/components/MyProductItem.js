import classes from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteItem from "./DeleteItem";
import ButtonControl from "./ButtonControl";

function ProductItem(props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const proceedHandler = (e) => {
    e.preventDefault();
    setIsDeleting(true);
  };

  const closeHandler = () => {
    setIsDeleting(false);
  };
  return (
    <>
      {isDeleting && <DeleteItem item={props} onClose={closeHandler} />}
      <li className={classes["product-li"]}>
        <Link to={`/products/${props._id}`} className={classes.product}>
          <div className={classes.image}>
            <img
              src={`${"http://localhost:8080/" + props.image}`}
              alt={props.title}
            />
          </div>
          <div
            className={`${classes["product-info"]} ${classes["my-product-info"]}`}
          >
            <p
              style={{
                fontWeight: "bold",
                paddingBottom: "1rem",
              }}
            >
              {props.title}
            </p>
            <p>$ {props.price}</p>
          </div>
          <ButtonControl item={props} onProceed={proceedHandler} />
        </Link>
      </li>
    </>
  );
}

export default ProductItem;
