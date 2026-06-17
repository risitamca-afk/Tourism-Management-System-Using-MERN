import React from "react";
import "./Top10places.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Top10placesdata } from "../../dataset/Top10placesdata";

const data =Top10placesdata ;
const Top10places = () => {
  const settings = {
    className: "center",
    dots: false,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(`Slider Changed to: ${index + 1}`);
    },
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="Top10places-outer-div">
      <div className="Top10Placesheading">
        <u>
          <h1>TOP 10 PLACES OF THIS MONTH</h1>
        </u>
      </div>
      <div className="Top10places-inner-div">
        <Slider {...settings}>
          {data.map((item, index) => (
            <div className="Top10places-card" key={index}>
              <div className="Top10places-cardimg">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="Top10places-cardtext">
                <h5>{item.name}</h5>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};


export default Top10places;
