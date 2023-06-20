import { useState } from "react";
import classes from "./Carousel.module.css";
import banner from "../img/abyss-banner.png";
import wish from "../img/wish.jpg";
import sale from "../img/abyssal-sale.png";

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  let totalSlides;

  const carouselItems = [{ image: banner }, { image: wish }, { image: sale }];

  totalSlides = carouselItems.length;
  const totalSlidesIndex = totalSlides - 1;

  const timeout = setTimeout(() => {
    if (activeIndex < totalSlidesIndex) {
      setActiveIndex((prevState) => prevState + 1);
    } else {
      setActiveIndex(0);
    }
  }, 3333);

  const prevSlideHandler = () => {
    clearTimeout(timeout);
    if (activeIndex === 0) {
      setActiveIndex(totalSlidesIndex);
    } else {
      setActiveIndex((prevState) => prevState - 1);
    }
  };

  const nextSlideHandler = () => {
    clearTimeout(timeout);
    if (activeIndex < totalSlidesIndex) {
      setActiveIndex((prevState) => prevState + 1);
    } else {
      setActiveIndex(0);
    }
  };

  return (
    <>
      <div className={classes.carousel}>
        <div className={classes.slider}>
          {carouselItems.map((slide, index) => {
            return (
              <div
                key={index}
                className={`${classes.slide} ${
                  index === activeIndex && classes.active
                } ${index === activeIndex - 1 && classes.previous} ${
                  index === activeIndex + 1 && classes.next
                } ${
                  activeIndex === 0 && index === totalSlidesIndex
                    ? classes.prev
                    : ""
                } ${
                  activeIndex === totalSlidesIndex && index === 0
                    ? classes.next
                    : ""
                }`}
              >
                <img src={slide.image} />
              </div>
            );
          })}
        </div>
        <button
          className={`${classes.chevron} ${classes["chevron-prev"]}`}
          onClick={prevSlideHandler}
        >
          <i className="fa-solid fa-chevron-left fa-fw fa-2xl"></i>
        </button>
        <button
          className={`${classes.chevron} ${classes["chevron-next"]}`}
          onClick={nextSlideHandler}
        >
          <i className="fa-solid fa-chevron-right fa-fw fa-2xl"></i>
        </button>
      </div>
    </>
  );
}

export default Carousel;
