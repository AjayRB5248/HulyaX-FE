import React from "react";
import Slider from "react-slick";
import BannerBg from "src/assets/frontend/images/banner/banner12.jpg";
import SACARBANNER from "src/assets/frontend/images/media/SACARAustraliaTour.jpeg";

import { TypeAnimation } from "react-type-animation";

import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { useCountdownDate } from "src/hooks/use-countdown";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // autoplay: true,
};

const Banner = (events: any) => {
  const { days, hours, minutes, seconds } = useCountdownDate(new Date("07/07/2024 21:30"));

  const featuredEvents = events?.events?.filter((eachEvent: any) => eachEvent.tags?.includes("FEATURED"));

  return (
    <Slider {...settings} className="banner-slider">
      {Array.isArray(featuredEvents) &&
        featuredEvents.map((featuredEvent: any) => {
          const posterImage = featuredEvent.eventImages?.find((eventImg: any) => eventImg?.isPrimary)?.imageurl;
          return (
            <div className="banner-section">
              <div className="banner-bg bg_img bg-fixed" style={{ backgroundImage: `url(${posterImage})` }}></div>
              <div className="container">
                <div className="banner-content">
                  <h1 className="title  cd-headline clip">
                    <span className="d-block">{featuredEvent.eventName}</span>
                  </h1>
                  <p>{featuredEvent.eventDescription}</p>
                  <Stack
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                    divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
                    sx={{ typography: "h2" }}
                    className="mt-5"
                  >
                    <TimeBlock label="Days" value={days} />

                    <TimeBlock label="Hours" value={hours} />

                    <TimeBlock label="Minutes" value={minutes} />

                    <TimeBlock label="Seconds" value={seconds} />
                  </Stack>
                  <button className="mt-5 theme-button">Buy Ticket Now</button>
                </div>
              </div>
            </div>
          );
        })}

      <div className="banner-section">
        <div className="banner-bg bg_img bg-fixed" style={{ backgroundImage: `url(${BannerBg.src})` }}></div>
        <div className="container">
          <div className="banner-content">
            <h1 className="title  cd-headline clip">
              {/* <span className="d-block">book your</span> tickets for {""} */}
              <span className="d-block">AXIX - ROAD To '24 Australia Tour</span>

              {/* <TypeAnimation
                sequence={["AXIX", 1000, "Sports", 1000, "Events", 1000, "Movies", 1000]}
                wrapper="span"
                speed={1}
                style={{ display: "inline-block" }}
                repeat={Infinity}
                className="banner-animation"
              /> */}
            </h1>
            <p>Safe, secure, reliable ticketing. Your ticket to live entertainment!</p>

            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
              sx={{ typography: "h2" }}
              className="mt-5"
            >
              <TimeBlock label="Days" value={days} />

              <TimeBlock label="Hours" value={hours} />

              <TimeBlock label="Minutes" value={minutes} />

              <TimeBlock label="Seconds" value={seconds} />
            </Stack>
            <button className="mt-5 theme-button">Buy Ticket Now</button>
          </div>
        </div>
      </div>

      <div className="banner-section">
        <div className="banner-bg bg_img bg-fixed" style={{ backgroundImage: `url(${SACARBANNER.src})` }}></div>
        <div className="container">
          <div className="banner-content">
            <h1 className="title  cd-headline clip">
              {/* <span className="d-block">book your</span> tickets for {""} */}
              <span className="d-block">SACAR Ft. CAREY Austrlia Tour</span>

              {/* <TypeAnimation
                sequence={["AXIX", 1000, "Sports", 1000, "Events", 1000, "Movies", 1000]}
                wrapper="span"
                speed={1}
                style={{ display: "inline-block" }}
                repeat={Infinity}
                className="banner-animation"
              /> */}
            </h1>
            <p>Safe, secure, reliable ticketing. Your ticket to live entertainment!</p>

            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
              sx={{ typography: "h2" }}
              className="mt-5"
            >
              <TimeBlock label="Days" value={days} />

              <TimeBlock label="Hours" value={hours} />

              <TimeBlock label="Minutes" value={minutes} />

              <TimeBlock label="Seconds" value={seconds} />
            </Stack>
            <button className="mt-5 theme-button">Buy Ticket Now</button>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Banner;

type TimeBlockProps = {
  label: string;
  value: string;
};

function TimeBlock({ label, value }: TimeBlockProps) {
  return (
    <div className="counter--timeblock">
      <Box> {value} </Box>
      <Box sx={{ color: "text.secondary", typography: "body1" }}>{label}</Box>
    </div>
  );
}
