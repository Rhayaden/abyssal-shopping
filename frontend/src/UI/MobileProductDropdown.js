import { Link } from "react-router-dom";

function MobileProductDropdown(props) {
  return (
    <>
      <ul>
        <li>
          <Link to="my-products/add-product" onClick={props.onClicked}>
            <i className="fa-solid fa-plus fa-fw"></i>Add Product
          </Link>
        </li>
        <li>
          <Link to="my-products" onClick={props.onClicked}>
            My Products
          </Link>
        </li>
      </ul>
    </>
  );
}

export default MobileProductDropdown;
