import Image from "next/image";
import EventPoster from "src/assets/frontend/images/event/Pink.jpg";
import Olivia from "src/assets/frontend/images/artists/Olivia.png";
import Sacar from "src/assets/frontend/images/artists/Sacar.jpeg";
import Neetesh from "src/assets/frontend/images/artists/Neetesh.jpeg";

import VenueIcon from "src/assets/frontend/images/icons/venue.png";

import SacarPoster from "src/assets/frontend/images/event/SacarPoster.jpeg";
import NeeteshPoster from "src/assets/frontend/images/event/NeeteshConcert.jpg";

import Slider from "react-slick";
import React from "react";
import { EventProps } from "src/types/events";
import { formatDate } from "src/utility";
import Link from "next/link";

const EventsSlider: React.FC<EventProps> = ({ events }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
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
          <p>Explore What's Trending Now: Stay ahead of the curve with the latest and hottest trends.</p>
        </div>
        <Slider {...settings}>
          {events &&
            Array.isArray(events) &&
            events.length > 0 &&
            events?.map((event: any) => {
              const eventVenues = event?.venues;
              console.log(eventVenues, "eventVenues");

              return (
                eventVenues &&
                eventVenues?.length > 0 &&
                eventVenues?.map((eventVenue: any) => (
                  <div className="slider-item">
                    <div className="event-item">
                      <div className="event-top-card">
                        <div className="event-date">
                          <h6 className="date-title">
                            {formatDate(eventVenue?.eventDate).day} {formatDate(eventVenue?.eventDate).month}
                          </h6>
                        </div>
                        <Image
                          src={event?.parentEvent?.images?.[1]?.imageurl}
                          alt={event?.parentEvent?.eventName}
                          width={800}
                          height={1200}
                        />
                        <h4 className="event-title">{event?.parentEvent?.eventName}</h4>
                      </div>

                      <div className="event-bottom-card d-flex flex-column p-4">
                        <div className="artist d-flex align-items-center">
                          <Image
                            src={event?.parentEvent?.artists?.[0]?.imageurl}
                            alt="Artist Profile"
                            className="artist-profile-img"
                            width={50}
                            height={50}
                          />
                          <h4 className="artist-name ml-3">
                            {event?.parentEvent?.artists?.[0]?.artistName}
                            {/* <p className="artist-position">{event?.parentEvent?.artist?.[0]?.category}</p> */}
                          </h4>
                          <Link href={`/events/${event?.parentEvent?.slug}`} className="ml-auto">
                            <button className="theme-button">Buy Ticket</button>
                          </Link>
                        </div>

                        <div className="venue d-flex align-items-center">
                          <Image src={VenueIcon} alt="Venue icon" className="venue-icon" />

                          <div className="venue-name ml-4">
                            {eventVenue?.venueId?.venueName}, {event?.state?.stateName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
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
