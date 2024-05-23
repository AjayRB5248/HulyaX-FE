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
import { EventProps, SubEventProps, Venue } from "src/types/events";
import Link from "next/link";
import moment from "moment";
import { formatDate } from "src/utility";

interface EventData {
  imageUrl: StaticImageData;
  date: string;
  month: string;
  title: string;
  venue: string;
  tags?: string[];
}

const eventsData: EventData[] = [
  {
    imageUrl: EventImg1,
    date: "28",
    month: "DEC",
    title: "SACAR Concert",
    venue: "27 Montague Street, Sydney",
    tags: ["Now Showing", "Exclusive"],
  },
  {
    imageUrl: EventImg2,
    date: "28",
    month: "DEC",
    title: "SACAR Concert",
    venue: "27 Montague Street, Sydney",
    tags: ["Now Showing", "Exclusive"],
  },
  // {
  //   imageUrl: EventImg3,
  //   date: "28",
  //   month: "DEC",
  //   title: "SACAR Concert",
  //   venue: "27 Montague Street, Sydney",
  //   tags: ["Now Showing", "Exclusive"],
  // },
  // {
  //   imageUrl: EventImg4,
  //   date: "28",
  //   month: "DEC",
  //   title: "SACAR Concert",
  //   venue: "27 Montague Street, Sydney",
  //   tags: ["Now Showing", "Exclusive"],
  // },
  // {
  //   imageUrl: SportsEvent,
  //   date: "28",
  //   month: "DEC",
  //   title: "SACAR Concert 2024",
  //   venue: "27 Montague Street, Sydney",
  //   tags: ["Now Showing", "Exclusive"],
  // },
  // {
  //   imageUrl: EventImg4,
  //   date: "28",
  //   month: "DEC",
  //   title: "SACAR Concert",
  //   venue: "27 Montague Street, Sydney",
  //   tags: ["Now Showing", "Exclusive"],
  // },
];

const tabItems = [
  {
    id: 1,
    title: "Coming Soon",
  },
  {
    id: 2,
    title: "Past Events",
  },
];

const statusMapper: any = {
  "Coming Soon": "PLANNED",
  "Past Events": "COMPLETED",
};

const getClosestEvent = (events: any): { event: SubEventProps; closestVenue: Venue } | null => {
  const today = new Date();
  let closestEvent: { event: SubEventProps; closestVenue: Venue } | null = null;

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

const EventsCarousel: React.FC<EventProps> = ({ events }) => {
  const [activeTab, setActiveTab] = useState<string>("Coming Soon");

  // Get Featured and Nearest Event to show in Featured Left Section
  const featuredEvents = events?.filter(
    (event: SubEventProps) => event?.parentEvent?.tags.includes("FEATURED") && event?.status === statusMapper[activeTab]
  );
  const closestEvent = getClosestEvent(featuredEvents);

  const remainingEvents = featuredEvents.filter((event) => closestEvent && event !== closestEvent.event);

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

        <div className="row events-row">
          {/* Put Carousel Later - Only Featured and Closest Event */}
          {closestEvent && (
            <div className="col-12 col-md-4 left-col">
              <div className="event-grid featured">
                <div className="movie-thumb c-thumb">
                  <div className="overlay"></div>
                  <Link href={`/events/${closestEvent.event?.parentEvent?.slug}`}>
                    <Image
                      src={closestEvent?.event?.parentEvent?.images?.[1]?.imageurl}
                      alt={closestEvent?.event?.parentEvent?.eventName}
                      width={800}
                      height={1200}
                    />
                  </Link>

                  <div className="event-date">
                    <h6 className="date-title">{formatDate(closestEvent.closestVenue.eventDate).day}</h6>
                    <span>{formatDate(closestEvent.closestVenue.eventDate).month}</span>
                  </div>
                  <h5 className="event-title">
                    <Link href={`/events/${closestEvent.event?.parentEvent?.slug}`}>
                      {closestEvent?.event?.parentEvent?.eventName}
                    </Link>
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
                        <a href="#0">
                          <Image
                            src={event.parentEvent?.images?.[1]?.imageurl}
                            alt={event.parentEvent?.eventName}
                            width={800}
                            height={1200}
                          />
                        </a>
                        <div className="event-date">
                          <h6 className="date-title">{formatDate(event.venues?.[0]?.eventDate).day}</h6>
                          <span>{formatDate(event.venues?.[0]?.eventDate).month}</span>
                        </div>
                        <h5 className="event-title">
                          <a href="#0">{event.parentEvent?.eventName}</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="tab">
          {/* <div className="section-header-2">
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
          </div> */}
          {/* <div className="tab-area mb-30-none">
            {activeTab === "Now Showing" && (
              <div className={`tab-item active`}>
                <EventCarouselItem events={filteredEvents} />
              </div>
            )}

            {activeTab === "Coming soon" && (
              <div className={`tab-item active`}>
                <EventCarouselItem events={filteredEvents} />
              </div>
            )}

            {activeTab === "Exclusive" && (
              <div className={`tab-item active`}>
                <EventCarouselItem events={filteredEvents} />
              </div>
            )}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default EventsCarousel;
