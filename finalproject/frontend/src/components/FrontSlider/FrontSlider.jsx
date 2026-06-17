import React, { useState, useEffect } from "react";
import "./FrontSlider.css";
import { Frontsliderdata } from "../../dataset/Frontsliderdata";
const data = Frontsliderdata;

function FrontSlider() {
  const [current, setCurrent] = useState(0);

  // Move to the next slide
  const nextSlide = () => {
    setCurrent(current === data.length - 1 ? 0 : current + 1);
  };

  // Move to the previous slide
  const previousSlide = () => {
    setCurrent(current === 0 ? data.length - 1 : current - 1);
  };

  // Manually set the slide based on dot click
  const setSlide = (index) => {
    setCurrent(index);
  };

  // Automatically move to the next slide every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(slideInterval);
  }, [current]);

  return (
    <div>
      <div className="container">
        <div className="left_arrow" onClick={previousSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div>
          <div className="image">
            {data.map((item, index) =>
              current === index ? (
                <div className="pictures" key={index}>
                  <img src={item.img} alt={`Slide ${index + 1}`} />
                </div>
              ) : null
            )}
          </div>
          {/* <div className="FrontSliderContent">
        {data.map((item, index) =>
            current === index ? (
              <div className="content">
                <h1>{item.name}</h1>
              </div>
            ) : null
          )}
        </div> */}
        </div>

        <div className="right_arrow" onClick={nextSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default FrontSlider;
