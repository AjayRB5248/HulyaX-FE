import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Image, { StaticImageData } from "next/image";

// Events Images

import EventImg1 from "src/assets/frontend/images/event/pexels-jonathan-borba-3563171.jpg";
import EventImg2 from "src/assets/frontend/images/event/pexels-markus-spiske-3806767.jpg";
import EventImg3 from "src/assets/frontend/images/event/event03.jpg";
import EventImg4 from "src/assets/frontend/images/event/event04.jpg";
import SportsEvent from "src/assets/frontend/images/event/sfx308846.jpg";

import EventCarouselItem from "../event-carousel-item";
import { useState } from "react";
import { useFetchEvents } from "src/api/events";
import ArtistImg from "src/assets/frontend/images/event/Sacar.jpeg";
import VenueIcon from "src/assets/frontend/images/event/icon/event-icon02.png";

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
  {
    imageUrl: EventImg3,
    date: "28",
    month: "DEC",
    title: "SACAR Concert",
    venue: "27 Montague Street, Sydney",
    tags: ["Now Showing", "Exclusive"],
  },
  {
    imageUrl: EventImg4,
    date: "28",
    month: "DEC",
    title: "SACAR Concert",
    venue: "27 Montague Street, Sydney",
    tags: ["Now Showing", "Exclusive"],
  },
  {
    imageUrl: SportsEvent,
    date: "28",
    month: "DEC",
    title: "SACAR Concert 2024",
    venue: "27 Montague Street, Sydney",
    tags: ["Now Showing", "Exclusive"],
  },
  {
    imageUrl: EventImg4,
    date: "28",
    month: "DEC",
    title: "SACAR Concert",
    venue: "27 Montague Street, Sydney",
    tags: ["Now Showing", "Exclusive"],
  },
];

const tabItems = [
  {
    id: 1,
    title: "Now Showing",
  },
  {
    id: 2,
    title: "Coming Soon",
  },
  {
    id: 3,
    title: "Exclusive",
  },
];

const EventsCarousel: React.FC = () => {
  const { events, loading, error, isFetching } = useFetchEvents();

  const [activeTab, setActiveTab] = useState<string>("Now Showing");

  // TODO: Tags Type ? Filter Accordingly
  const filteredEvents = events.filter((event: any) => !event.tags?.includes(activeTab));

  return (
    <section className="event-section bg-four section-wrapper">
      <div className="container-fluid">
        {/* New Design */}
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
          {/* Put Carousel Here - Only Featured Images */}
          <div className="col-12 col-md-4 left-col">
            <div className="event-grid featured">
              <div className="movie-thumb c-thumb">
                <div className="overlay"></div>
                <a href="#0">
                  <Image src={EventImg2} alt="Event Image" />
                </a>
                <div className="event-date">
                  <h6 className="date-title">28</h6>
                  <span>Dec</span>
                </div>
                <h5 className="event-title">
                  <a href="#0">SACAR Australia Concert 2024</a>
                </h5>
              </div>
              <div className="event-desc p-3 d-none">
                <div className="event-artist d-flex align-items-center">
                  <span className="artist-img">
                    <Image src={ArtistImg} alt="Artist Image" />
                  </span>
                  <div className="d-flex flex-column ml-3">
                    <span className="artist-name">Sacar</span>

                    <div className="event-venue">
                      <i className="fa fa-map-marker"></i>
                      <span className="venue-name ml-2">327 Montague Street</span>
                    </div>

                    <button className="theme-button">Buy Ticket</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Put Carousel Here -Other Events Images */}
          <div className="col-12 col-md-8 right-col">
            <div className="row">
              {eventsData.map((event: any) => (
                <div className="col-6 col-md-4">
                  <div className="event-grid">
                    <div className="movie-thumb c-thumb">
                      <div className="overlay"></div>
                      <a href="#0">
                        <Image src={event.imageUrl} alt="Event Image" />
                      </a>
                      <div className="event-date">
                        <h6 className="date-title">28</h6>
                        <span>Dec</span>
                      </div>
                      <h5 className="event-title">
                        <a href="#0">{event.title}</a>
                      </h5>
                    </div>
                    <div className="event-desc p-3 d-none">
                      <div className="event-artist d-flex align-items-center">
                        <span className="artist-img">
                          <Image src={ArtistImg} alt="Artist Image" />
                        </span>
                        <div className="d-flex flex-column ml-3">
                          <span className="artist-name">Sacar</span>

                          <div className="event-venue">
                            <i className="fa fa-map-marker"></i>
                            <span className="venue-name ml-2">327 Montague Street</span>
                          </div>

                          <button className="theme-button">Buy Ticket</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* New Design Ends */}

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
