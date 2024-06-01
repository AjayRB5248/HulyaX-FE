import moment from "moment";
import Image from "next/image";
import Link from "next/link";

import VenueIcon from "src/assets/frontend/images/event/icon/event-icon02.png";
import ContactIcon from "src/assets/frontend/images/event/icon/event-icon03.png";
import { EventStatusEnum } from "src/sections/tour/utils";
import TicketIcon from "src/assets/frontend/images/event/icon/ticket-icon.png";

const EventVenues: React.FC<any> = ({ eventData, states, eventStatus }) => {
  console.log(eventStatus, "eventStatus");
  const getStateDetails = (stateId: string) => {
    const stateDetails = states && states?.length > 0 && states.find((eachState: any) => eachState?._id === stateId);
    return stateDetails ?? {};
  };

  const sortedEventData = eventData
    ?.filter((eachEvent: any) => eachEvent?.venues && eachEvent?.venues?.length > 0)
    .flatMap((eachEvent: any) =>
      eachEvent.venues.map((eachVenue: any) => ({
        ...eachVenue,
        stateName: getStateDetails(eachVenue?.venueId?.state)?.stateName,
      }))
    )
    ?.sort((a: any, b: any) => moment(a.eventDate).diff(moment(b.eventDate)));

  return (
    <section className="book-section">
      <div className="container-fluid">
        <div className="book-wrapper">
          <div className="left-side">
            {sortedEventData && sortedEventData.length > 0 ? (
              sortedEventData?.map((eachVenue: any) => (
                <div className="item" key={eachVenue._id}>
                  <div className="item-thumb">
                    <Image src={VenueIcon} alt={eachVenue?.venueId?.venueName} className="venue-icon" />
                  </div>
                  <div className="item-content">
                    <span className="up">
                      {eachVenue?.venueId?.venueName}, {eachVenue?.stateName}
                    </span>
                    <span>{eachVenue.city}</span>
                    <div className="item-date">{moment(eachVenue?.eventDate).format("MMM DD, YYYY")}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="item">
                <div className="item-thumb">
                  <Image src={VenueIcon} alt={"Venue Icon"} className="venue-icon" />
                </div>
                <div className="item-content">
                  <span className="font-weight-bold">Venues To be Announced Soon..</span>
                </div>
              </div>
            )}
            {eventStatus === EventStatusEnum.PLANNED && (
              <div className="item">
                <div className="item-thumb">
                  <Image
                    src={TicketIcon}
                    alt="Contact Icon"
                    className="ticket-icon"
                    style={{ width: "auto", height: "40px" }}
                  />
                </div>
                <div className="item-content">
                  <span className="up font-weight-bold"> Tickets Opening Soon!!</span>
                </div>
              </div>
            )}
            <div className="item">
              <div className="item-thumb">
                <Image src={ContactIcon} alt="Contact Icon" className="contact-icon" />
              </div>
              <div className="item-content">
                <span className="up">Drop us a line:</span>
                <Link href="MailTo:info@hulyax.com.au" className="d-block email-link text-white">
                  info@hulyax.com.au
                </Link>
              </div>
            </div>
          </div>
          {/* <a href="#0" className="custom-button">
            <i className="fa fa-ticket-alt mr-2"></i>
            book tickets
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default EventVenues;
