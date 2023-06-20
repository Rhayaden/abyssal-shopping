import { Link } from "react-router-dom";
import classes from "./Dropdown.module.css";

function ProductDropdown(props) {
  return (
    <>
      <div
        className={`${classes.dropdown} ${classes["product-dropdown"]}`}
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}
      >
        <ul>
          <li>
            <Link to="my-products/add-product">
              <i className="fa-solid fa-plus fa-fw"></i>Add Product
            </Link>
          </li>
          <li>
            <Link to="my-products">My Products</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProductDropdown;
