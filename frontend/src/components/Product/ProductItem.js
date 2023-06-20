import classes from "./ProductItem.module.css";
import { Link } from "react-router-dom";

function ProductItem(props) {
  return (
    <>
      <li className={classes["product-li"]}>
        <Link to={`/products/${props._id}`} className={classes.product}>
          <div className={classes.image}>
            <img src={`${"http://localhost:8080/" + props.image}`} />
          </div>
          <div className={classes["product-info"]}>
            <p
              style={{
                fontWeight: "bold",
                paddingBottom: `${props.stock == 0} ? "": "1rem"`,
              }}
            >
              {props.title}
            </p>
            <p>$ {props.price}</p>
            {props.stock == 0 && <p>Currently not available</p>}
          </div>
        </Link>
      </li>
    </>
  );
}

export default ProductItem;
