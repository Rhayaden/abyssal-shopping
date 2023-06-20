import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
import { AuthContext } from "../../util/auth-context";
import safety from "../../img/safety.png";
import delivery from "../../img/fast-delivery.png";
import Carousel from "../Carousel/Carousel";

function Home() {
  const authCtx = useContext(AuthContext);
  const isAuth = authCtx.isAuthenticated;
  const [color, setColor] = useState("rgb(35, 1, 45)");
  const navigate = useNavigate();
  const colorChangeHandler = () => {
    setColor("rgb(85, 1, 125)");
  };
  const resetStateHandler = () => {
    setColor("rgb(35, 1, 45)");
  };
  const navigateAuth = () => {
    navigate("auth?mode=login");
  };
  return (
    <>
      <section className={classes.carousel}>
        <Carousel />
      </section>
      <section className={classes.welcome}>
        <p>
          Welcome to{" "}
          <span style={{ color: isAuth ? "rgb(85,1,125" : color }}>Abyss</span>
        </p>
        {!isAuth && (
          <button
            className={classes["get-started"]}
            onMouseOver={colorChangeHandler}
            onMouseOut={resetStateHandler}
            onClick={navigateAuth}
          >
            Get Started
          </button>
        )}
      </section>
      <section className={classes.safety}>
        <div className={classes.shield}>
          <img src={safety} />
        </div>
        <h3>Safety first...</h3>
        <p>We care about your safety and offer you safe shopping.</p>
      </section>
      <section className={classes.discover}>
        <p>Discover the Abyss</p>
      </section>
      <section className={classes.delivery}>
        <div>
          <h3>Faster, faster, faster...</h3>
          <p>Your lightning-fast delivery partner.</p>
        </div>
        <div className={classes.truck}>
          <img src={delivery} />
        </div>
        {/* <i className="fa-solid fa-truck-fast fa-2xl"></i> */}
      </section>
    </>
  );
}
export default Home;
