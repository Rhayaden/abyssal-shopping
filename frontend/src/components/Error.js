import { useRouteError } from "react-router-dom";
import classes from "./Error.module.css";
import errorImg from "../img/error.png";

function Error() {
  const error = useRouteError();
  return (
    <>
      <div className={classes.error}>
        <div className={classes.expired}>
          <img src={errorImg} />
          <p>{error.data ? error.data : "An error occured"}</p>
        </div>
      </div>
    </>
  );
}

export default Error;
