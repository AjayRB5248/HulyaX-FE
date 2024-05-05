import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { SliderGallery } from "src/components/slider-gallery";
import EventSponsors from "./event-sponsors";
import EventArtists from "./event-artists";
import EventBooking from "./event-booking";

const EventAbout: React.FC<any> = ({ eventId, eventDescription, eventImages, sponsors, venues }) => {
  return (
    <section className="movie-details-section padding-top padding-bottom">
      <div className="container-fluid">
        <div className="row justify-content-center flex-wrap-reverse mb--50 no-gutters">
          <div className="col-lg-5 col-sm-10 col-md-6">
            <EventBooking eventId={eventId} venues={venues} />
          </div>

          <div className="col-lg-7">
            <div className="movie-details">
              <h3 className="title font-weight-bold mb-4">Gallery</h3>
              <SliderGallery eventImages={eventImages} />

              <div className="tab summery-review">
                <ul className="tab-menu">
                  <li className="active">Event Details</li>
                  <li>
                    user review <span>147</span>
                  </li>
                </ul>
                <div className="tab-area">
                  <div className="tab-item active">
                    {/* Event Description */}
                    <div className="item" dangerouslySetInnerHTML={{ __html: eventDescription }} />
                    {/* Sponsors and Organizers */}
                    <EventSponsors sponsors={sponsors} />
                    {/* Artists */}
                    <EventArtists sponsors={sponsors} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventAbout;
