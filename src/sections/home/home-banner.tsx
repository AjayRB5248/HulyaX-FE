import React from "react";
import Slider from "react-slick";
import BannerBg from "src/assets/frontend/images/banner/banner12.jpg";
import { TypeAnimation } from "react-type-animation";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // autoplay: true,
};

const Banner = () => {
  return (
    <Slider {...settings} className="banner-slider">
      <div className="banner-section">
        <div className="banner-bg bg_img bg-fixed" style={{ backgroundImage: `url(${BannerBg.src})` }}></div>
        <div className="container">
          <div className="banner-content">
            <h1 className="title  cd-headline clip">
              <span className="d-block">book your</span> tickets for {""}
              <TypeAnimation
                sequence={["Concerts", 1000, "Sports", 1000, "Events", 1000, "Movies", 1000]}
                wrapper="span"
                speed={1}
                style={{ display: "inline-block" }}
                repeat={Infinity}
                className="banner-animation"
              />
            </h1>
            <p>Safe, secure, reliable ticketing. Your ticket to live entertainment!</p>
            <button className="mt-5 theme-button">Buy Ticket Now</button>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Banner;
