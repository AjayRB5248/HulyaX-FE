import React from "react";
import Slider from "react-slick";
import moment from "moment-timezone";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { useCountdownDate } from "src/hooks/use-countdown";

const settings = {
  dots: true,
  infinite: false,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  // autoplay: true,
};

interface EventImage {
  isPrimary: boolean;
  imageurl: string;
}

interface Venue {
  eventDate: string;
}

interface ParentEvent {
  eventName: string;
  eventDescription: string;
  images?: EventImage[];
  tags?: string[];
}

interface FeaturedEvent {
  id: string;
  slug: string;
  parentEvent: ParentEvent;
  venues?: Venue[];
  status: string;
  state: any;
}

interface BannerProps {
  events: FeaturedEvent[];
}

const Banner: React.FC<BannerProps> = ({ events }) => {
  const featuredEvents =
    events &&
    Array.isArray(events) &&
    events.length > 0 &&
    events.filter(
      (eachEvent) =>
        eachEvent.parentEvent?.tags?.includes("FEATURED") && ["PLANNED", "ONGOING"].includes(eachEvent.status)
    );

  console.log(featuredEvents, "featuredEvents");

  return (
    <Slider {...settings} className="banner-slider">
      {Array.isArray(featuredEvents) &&
        featuredEvents.map((featuredEvent) => {
          const posterImage = featuredEvent.parentEvent?.images?.find((eventImg) => eventImg?.isPrimary)?.imageurl;
          console.log(posterImage, "posterImage");

          return <EventBanner key={featuredEvent.id} event={featuredEvent} posterImage={posterImage} />;
        })}
    </Slider>
  );
};

interface EventBannerProps {
  event: FeaturedEvent;
  posterImage?: string;
}

const EventBanner: React.FC<EventBannerProps> = ({ event, posterImage }) => {
  const _startDate = event.venues?.[0]?.eventDate ?? "";
  const timezone = event.state?.timeZone;
  // const eventStartDate = moment(_startDate).tz(timezone).format("MM/DD/YYYY HH:mm");

  const { days, hours, minutes, seconds } = useCountdownDate(new Date(_startDate));

  return (
    <div className="banner-section">
      <div className="banner-bg bg_img bg-fixed" style={{ backgroundImage: `url(${posterImage})` }}></div>
      <div className="container">
        <div className="banner-content">
          <h1 className="title cd-headline clip">
            <span className="d-block">{event.parentEvent?.eventName}</span>
          </h1>
          <p dangerouslySetInnerHTML={{ __html: event.parentEvent?.eventDescription }} />
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
