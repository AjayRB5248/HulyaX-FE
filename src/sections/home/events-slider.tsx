import Image from "next/image";
import EventPoster from "src/assets/frontend/images/event/Pink.jpg";
import Olivia from "src/assets/frontend/images/artists/Olivia.png";
import Sacar from "src/assets/frontend/images/artists/Sacar.jpeg";
import Neetesh from "src/assets/frontend/images/artists/Neetesh.jpeg";

import VenueIcon from "src/assets/frontend/images/icons/icons8-location-24.png";

import SacarPoster from "src/assets/frontend/images/event/SacarPoster.jpeg";
import NeeteshPoster from "src/assets/frontend/images/event/NeeteshConcert.jpg";

import Slider from "react-slick";
import React from "react";
import { EventProps } from "src/types/events";
import { getClosestEvent } from "src/utils/format-date";
import Link from "next/link";
import moment from "moment-timezone";
import { getStateDetails } from "src/utils/helper";

const EventsSlider: React.FC<EventProps> = ({ events }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    // speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    draggable: true,
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

  const secondSliderSettings = {
    ...settings,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <section className="section-wrapper events-slider-wrapper">
      <div className="container-fluid">
        <div className="section-title">
          <h4 className="title">Trending Now</h4>
          <p className="event-sub-title">Stay Ahead of the Game: Discover the Latest Event Insights!</p>
        </div>
        <Slider {...settings}>
          {events &&
            Array.isArray(events) &&
            events.length > 0 &&
            events?.map((event: any) => {
              const stateNames = event?.childEvents?.map((childEvent: any) => childEvent?.state?.stateName) || [];

              const displayedStateNames =
                stateNames?.length > 3 ? stateNames?.slice(0, 3).join(", ") + " + more" : stateNames?.join(", ");

              const closestEvent = getClosestEvent(event?.childEvents?.[0]?.venues);

              const stateDetail = getStateDetails(event?.states, closestEvent?.venueId?.state);

              const closestDate = closestEvent?.eventDate;

              return (
                <div className="slider-item">
                  <div className="event-item">
                    <div className="event-top-card">
                      <div className="event-date">
                        {event.childEvents?.length > 0 && event.childEvents?.[0]?.venues?.length > 0 ? (
                          <>
                            <small>Starts from:</small>
                            <h6 className="date-title">
                              {moment(closestDate)?.tz(stateDetail?.timeZone)?.format("MMM DD")}
                            </h6>
                          </>
                        ) : (
                          <span className="text-capitalize">
                            Coming <br></br> &nbsp; Soon
                          </span>
                        )}
                        <h6 className="date-title"></h6>
                      </div>
                      <Image
                        src={event?.images?.[1]?.imageurl ?? event?.images?.[0]?.imageurl}
                        alt={event?.eventName}
                        width={800}
                        height={1200}
                      />
                    </div>

                    <div className="event-bottom-card d-flex flex-column p-4">
                      <h4 className="event-title">{event?.eventName}</h4>

                      <div className="artist d-flex align-items-center">
                        <Image
                          src={event?.artists?.[0]?.images?.[0]?.imageurl}
                          alt={event?.artists?.[0]?.artistName}
                          className="artist-profile-img"
                          width={50}
                          height={50}
                        />
                        <h4 className="artist-name ml-3">
                          {event?.artists?.[0]?.artistName}
                          {/* <p className="artist-position">{event?.artists?.[0]?.category}</p> */}
                        </h4>
                        <Link href={`/events/${event?.slug}`} className="ml-auto">
                          <button className="theme-button">
                            {event.status === "ONGOING" ? "BUY TICKET" : "View Details"}
                          </button>
                        </Link>
                      </div>

                      <div className="venue d-flex align-items-center">
                        <Image src={VenueIcon} alt="Venue icon" className="venue-icon" />

                        <div className="venue-name ml-4">
                          {event?.childEvents?.length == 0 ? "TBA" : displayedStateNames}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>

        {/* <Slider {...secondSliderSettings} className="d-none d-sm-block">
          <div className="slider-item">
            <div className="event-item">
              <div className="event-top-card">
                <div className="event-date">
                  <h6 className="date-title">28 DEC</h6>
                </div>
                <Image src={EventPoster} alt="Event Poster" />
                <h4 className="event-title">Pink Summer Carnival</h4>
              </div>

              <div className="event-bottom-card d-flex flex-column p-4">
                <div className="artist d-flex align-items-center">
                  <Image src={Olivia} alt="Artist Profile" className="artist-profile-img" />
                  <h4 className="artist-name ml-3">
                    Olivia Rodrigo
                    <p className="artist-position">Artist/SongWriter</p>
                  </h4>
                  <button className="theme-button">Buy Ticket</button>
                </div>

                <div className="venue d-flex align-items-center">
                  <Image src={VenueIcon} alt="Venue icon" className="venue-icon" />

                  <div className="venue-name ml-3">128 Street Olympic, Sydney, Australia</div>
                </div>
              </div>
            </div>
          </div>

          <div className="slider-item">
            <div className="event-item">
              <div className="event-top-card">
                <div className="event-date">
                  <h6 className="date-title">28 DEC</h6>
                </div>
                <Image src={SacarPoster} alt="Event Poster" />
                <h4 className="event-title">Sacar Australia Tour 2024</h4>
              </div>

              <div className="event-bottom-card d-flex flex-column p-4">
                <div className="artist d-flex align-items-center">
                  <Image src={Sacar} alt="Artist Profile" className="artist-profile-img" />
                  <h4 className="artist-name ml-3">
                    Sacar Adhikari
                    <p className="artist-position">Artist/SongWriter</p>
                  </h4>
                  <button className="theme-button">Buy Ticket</button>
                </div>

                <div className="venue d-flex align-items-center">
                  <Image src={VenueIcon} alt="Venue icon" className="venue-icon" />

                  <div className="venue-name ml-3">128 Street Olympic, Sydney, Australia</div>
                </div>
              </div>
            </div>
          </div>

          <div className="slider-item">
            <div className="event-item">
              <div className="event-top-card">
                <div className="event-date">
                  <h6 className="date-title">28 DEC</h6>
                </div>
                <Image src={NeeteshPoster} alt="Event Poster" />
                <h4 className="event-title">Rebirth Australia Tour</h4>
              </div>

              <div className="event-bottom-card d-flex flex-column p-4">
                <div className="artist d-flex align-items-center">
                  <Image src={Neetesh} alt="Artist Profile" className="artist-profile-img" />
                  <h4 className="artist-name ml-3">
                    Neetesh Jung Kunwar
                    <p className="artist-position">Artist/SongWriter</p>
                  </h4>
                  <button className="theme-button">Buy Ticket</button>
                </div>

                <div className="venue d-flex align-items-center">
                  <Image src={VenueIcon} alt="Venue icon" className="venue-icon" />

                  <div className="venue-name ml-3">128 Street Olympic, Sydney, Australia</div>
                </div>
              </div>
            </div>
          </div>

          <div className="slider-item">
            <div className="event-item">
              <div className="event-top-card">
                <div className="event-date">
                  <h6 className="date-title">28 DEC</h6>
                </div>
                <Image src={EventPoster} alt="Event Poster" />
                <h4 className="event-title">Pink Summer Carnival</h4>
              </div>

              <div className="event-bottom-card d-flex flex-column p-4">
                <div className="artist d-flex align-items-center">
                  <Image src={Olivia} alt="Artist Profile" className="artist-profile-img" />
                  <h4 className="artist-name ml-3">
                    Olivia Rodrigo
                    <p className="artist-position">Artist/SongWriter</p>
                  </h4>
                  <button className="theme-button">Buy Ticket</button>
                </div>

                <div className="venue d-flex align-items-center">
                  <Image src={VenueIcon} alt="Venue icon" className="venue-icon" />

                  <div className="venue-name ml-3">128 Street Olympic, Sydney, Australia</div>
                </div>
              </div>
            </div>
          </div>
        </Slider> */}
      </div>
    </section>
  );
};

export default EventsSlider;
