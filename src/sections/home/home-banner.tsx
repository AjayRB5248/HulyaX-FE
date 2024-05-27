import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import moment from "moment-timezone";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { useCountdownDate } from "src/hooks/use-countdown";
import { EachEventProps, EventProps } from "src/types/events";
import { EventStatusEnum } from "../tour/utils";

const settings = {
  dots: true,
  infinite: false,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  // autoplay: true,
};

const Banner: React.FC<EventProps> = ({ events }) => {
  const featuredEvents =
    events &&
    Array.isArray(events) &&
    events.length > 0 &&
    events.filter(
      (eachEvent) => eachEvent.tags?.includes("FEATURED") && [EventStatusEnum.ONGOING].includes(eachEvent.status)
    );

  return (
    <Slider {...settings} className="banner-slider">
      {Array.isArray(featuredEvents) &&
        featuredEvents.map((featuredEvent) => {
          const posterImage = featuredEvent.images?.find((eventImg) => eventImg?.isPrimary)?.imageurl;

          return (
            <EventBanner
              key={featuredEvent.id}
              event={featuredEvent}
              posterImage={posterImage}
              mobilePosterImage={featuredEvent.images?.[1]?.imageurl}
            />
          );
        })}
    </Slider>
  );
};

interface EventBannerProps {
  event: EachEventProps;
  posterImage?: string;
  mobilePosterImage?: string;
}

const EventBanner: React.FC<EventBannerProps> = ({ event, posterImage, mobilePosterImage }) => {
  const [isMobile, setIsMobile] = useState(false);
  console.log(isMobile, "isMobile");

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backgroundImage = isMobile ? mobilePosterImage : posterImage;

  const nearestEvent: any = event?.childEvents?.[0];
  const _startDate = nearestEvent?.venues?.[0]?.eventDate ?? "";
  const timezone = event?.states?.find((state: any) => state._id === nearestEvent?.state?._id)?.timeZone;

  const eventStartDate = moment(_startDate)?.tz(timezone)?.format("MM/DD/YYYY HH:mm");

  const { days, hours, minutes, seconds } = useCountdownDate(new Date(eventStartDate));

  return (
    <div className="banner-section">
      <div className="banner-bg bg_img bg-fixed" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="container">
        <div className="banner-content">
          <h1 className="title cd-headline clip">
            <span className="d-block">{event.eventName}</span>
          </h1>
          <p dangerouslySetInnerHTML={{ __html: event.eventDescription }} />
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
          <Link href={`/events/${event.slug}`}>
            <button className="mt-5 theme-button">Buy Ticket Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;

interface TimeBlockProps {
  label: string;
  value: string | number;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ label, value }) => {
  return (
    <div className="counter--timeblock">
      <Box>{value}</Box>
      <Box sx={{ color: "white", typography: "body1" }}>{label}</Box>
    </div>
  );
};
