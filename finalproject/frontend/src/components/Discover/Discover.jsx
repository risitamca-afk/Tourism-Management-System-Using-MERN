import React from "react";
import "./Discover.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Discoverdata } from "../../dataset/Discoverdata";
const data = Discoverdata;
// const Discover = ({data}) =>
const Discover = () => {
  const settings = {
    className: "center",
    dots: false,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 7,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(`Slider Changed to: ${index + 1}`);
    },
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="Discover-outer-div">
      <div className="Discoverheading">
        <u>
          <h1>Find Your Interest</h1>
        </u>
      </div>
      <div className="Discover-inner-div">
        <Slider {...settings}>
          {data.map((item, index) => (
            <div className="Discover-card" key={index}>
              <div className="Discover-cardimg">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="Discover-cardtext">
                <h5>{item.name}</h5>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Discover;
