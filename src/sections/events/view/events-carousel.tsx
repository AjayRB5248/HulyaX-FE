import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Image, { StaticImageData } from "next/image";

// Events Images

import EventImg1 from "src/assets/frontend/images/media/AXIX.jpeg";
import EventImg2 from "src/assets/frontend/images/media/SACARAustraliaTour.jpeg";
import EventImg3 from "src/assets/frontend/images/media/MajjaleHasschha.jpeg";
import EventImg4 from "src/assets/frontend/images/event/event04.jpg";
import SportsEvent from "src/assets/frontend/images/event/sfx308846.jpg";

import EventCarouselItem from "../event-carousel-item";
import { useState } from "react";
import { useFetchEvents } from "src/api/events";
import ArtistImg from "src/assets/frontend/images/event/Sacar.jpeg";
import VenueIcon from "src/assets/frontend/images/event/icon/event-icon02.png";
import { EachEventProps, EventProps, Venue } from "src/types/events";
import Link from "next/link";
import moment from "moment";
import { formatDate } from "src/utils/format-date";
import Slider from "react-slick";

interface EventData {
  imageUrl: StaticImageData;
  date: string;
  month: string;
  title: string;
  venue: string;
  tags?: string[];
}

const tabItems = [
  {
    id: 1,
    title: "Upcoming",
  },
  {
    id: 2,
    title: "Past Events",
  },
];

const statusMapper: any = {
  Upcoming: "PLANNED",
  "Past Events": "COMPLETED",
};

const getClosestEvent = (events: any): { event: EachEventProps; closestVenue: Venue } | null => {
  const today = new Date();
  let closestEvent: { event: EachEventProps; closestVenue: Venue } | null = null;

  events.forEach((event: any) => {
    event?.venues?.forEach((venue: Venue) => {
      const eventDate = new Date(venue.eventDate);
      if (
        !closestEvent ||
        Math.abs(eventDate.getTime() - today.getTime()) <
          Math.abs(new Date(closestEvent.closestVenue.eventDate).getTime() - today.getTime())
      ) {
        closestEvent = { event, closestVenue: venue };
      }
    });
  });

  return closestEvent;
};

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: "linear",
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const EventsCarousel: React.FC<EventProps> = ({ events }) => {
  const [activeTab, setActiveTab] = useState<string>("Upcoming");

  const filteredEvents = events?.filter((event: EachEventProps) => event?.status === statusMapper[activeTab]);

  // const closestEvent = getClosestEvent(filteredEvents);

  const featuredEvent: any = filteredEvents?.find((event: EachEventProps) => event.tags?.includes("FEATURED"));

  const remainingEvents = featuredEvent
    ? filteredEvents.filter((event: any) => featuredEvent && event?._id !== featuredEvent?._id)
    : filteredEvents;

  return (
    <section className="event-section section-wrapper">
      <div className="container-fluid">
        <div className="section-header-2">
          <div className="left">
            <h2 className="title">events</h2>
            <p>Be sure not to miss these Event today.</p>
          </div>
          <ul className="tab-menu">
            {tabItems.map((tabItem) => (
              <li className={tabItem.title === activeTab ? "active" : ""} onClick={() => setActiveTab(tabItem.title)}>
                {tabItem.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="row events-row d-none">
          {/* Put Carousel Later - Only Featured and Closest Event */}
          {featuredEvent && (
            <div className="col-12 col-md-4 left-col">
              <div className="event-grid featured">
                <div className="movie-thumb c-thumb">
                  <div className="overlay"></div>
                  <Link href={`/events/${featuredEvent.slug}`}>
                    <Image
                      src={featuredEvent?.images?.[1]?.imageurl ?? featuredEvent?.images?.[0]?.imageurl}
                      alt={featuredEvent?.eventName}
                      width={800}
                      height={1200}
                    />
                  </Link>

                  <div className="event-date">
                    <h6 className="date-title">
                      {formatDate(featuredEvent.childEvents?.[0]?.venues?.[0]?.eventDate)?.day}
                    </h6>
                    <span>{formatDate(featuredEvent.childEvents?.[0]?.venues?.[0]?.eventDate)?.month}</span>
                  </div>
                  <h5 className="event-title">
                    <Link href={`/events/${featuredEvent.slug}`}>{featuredEvent?.eventName}</Link>
                  </h5>
                </div>
              </div>
            </div>
          )}
          {/* Put Carousel Here -Other Events  */}
          <div className="col-12 col-md-8 right-col">
            <div className="row">
              {remainingEvents.length > 0 &&
                remainingEvents.map((event: any) => (
                  <div className="col-12 col-md-6">
                    <div className="event-grid">
                      <div className="movie-thumb c-thumb">
                        <div className="overlay"></div>
                        <Link href={`/events/${event.slug}`}>
                          <Image
                            src={event?.images?.[1]?.imageurl ?? event?.images?.[0]?.imageurl}
                            alt={event?.eventName}
                            width={800}
                            height={1200}
                          />
                        </Link>
                        <div className="event-date">
                          <h6 className="date-title">
                            {formatDate(event.childEvents?.[0]?.venues?.[0]?.eventDate)?.day}
                          </h6>
                          <span>{formatDate(event.childEvents?.[0]?.venues?.[0]?.eventDate)?.month}</span>
                        </div>
                        <h5 className="event-title">
                          <Link href={`/events/${event.slug}`}>{event?.eventName}</Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <Slider {...settings} className="event-slider">
          {filteredEvents &&
            Array.isArray(filteredEvents) &&
            filteredEvents.length > 0 &&
            filteredEvents?.map((event: any) => {
              return (
                <div className="slider-item">
                  <div className="event-grid">
                    <div className="movie-thumb c-thumb">
                      <div className="overlay"></div>
                      <Link href={`/events/${event.slug}`}>
                        <Image
                          src={event?.images?.[1]?.imageurl ?? event?.images?.[0]?.imageurl}
                          alt={event?.eventName}
                          width={800}
                          height={1200}
                        />
                      </Link>
                      {event.childEvents?.length > 0 && event.childEvents?.[0]?.venues?.length > 0 && (
                        <div className="event-date">
                          <h6 className="date-title">
                            {formatDate(event.childEvents?.[0]?.venues?.[0]?.eventDate)?.day}
                          </h6>
                          <span>{formatDate(event.childEvents?.[0]?.venues?.[0]?.eventDate)?.month}</span>
                        </div>
                      )}
                      <h5 className="event-title">
                        <Link href={`/events/${event.slug}`}>{event?.eventName}</Link>
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </section>
  );
};

export default EventsCarousel;
