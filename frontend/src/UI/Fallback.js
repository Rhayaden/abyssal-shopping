import LoadingSpinner from "./LoadingSpinner";
import classes from "./Fallback.module.css";

function Fallback() {
  return (
    <>
      <div className={classes.fallback}>
        <LoadingSpinner />
      </div>
    </>
  );
}

export default Fallback;
