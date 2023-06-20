import { Link, useLocation, useParams } from "react-router-dom";
import classes from "./ButtonControl.module.css";

function ButtonControl(props) {
  const { pathname } = useLocation();
  const params = useParams();

  return (
    <>
      <div
        className={`${classes["button-control"]} ${
          pathname === `/products/${params.productID}` &&
          classes["prod-button-control"]
        }`}
      >
        <Link to={`/my-products/${props.item._id}/edit`}>
          <i className="fa-solid fa-pen-to-square fa-fw"></i>
          {pathname === `/products/${params.productID}` ? "Edit" : ""}
        </Link>
        <button onClick={props.onProceed}>
          <i className="fa-solid fa-trash-can fa-fw"></i>
          {pathname === `/products/${params.productID}` ? "Delete" : ""}
        </button>
      </div>
    </>
  );
}

export default ButtonControl;
