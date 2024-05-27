import moment from "moment";
import Image from "next/image";
import Link from "next/link";

import VenueIcon from "src/assets/frontend/images/event/icon/event-icon02.png";
import ContactIcon from "src/assets/frontend/images/event/icon/event-icon03.png";

const EventVenues: React.FC<any> = ({ eventData, states }) => {
  const getStateDetails = (stateId: string) => {
    const stateDetails = states && states.length > 0 && states.find((eachState: any) => eachState?._id === stateId);
    return stateDetails ?? {};
  };
  return (
    <section className="book-section">
      <div className="container-fluid">
        <div className="book-wrapper">
          <div className="left-side">
            {eventData &&
              eventData.length > 0 &&
              eventData?.map(
                (eachEvent: any) =>
                  eachEvent?.venues &&
                  eachEvent?.venues?.length > 0 &&
                  eachEvent?.venues?.map((eachVenue: any) => {
                    const stateName = getStateDetails(eachVenue?.venueId?.state)?.stateName;
                    return (
                      <div className="item" key={eachVenue._id}>
                        <div className="item-thumb">
                          <Image src={VenueIcon} alt={eachVenue.venueId?.venueName} className="venue-icon" />
                        </div>
                        <div className="item-content">
                          <span className="up">
                            {eachVenue.venueId?.venueName}, {stateName}
                          </span>
                          <span>{eachVenue.city}</span>
                          <div className="item-date">{moment(eachVenue.eventDate).format("MMM DD, YYYY")}</div>
                        </div>
                      </div>
                    );
                  })
              )}
            <div className="item">
              <div className="item-thumb">
                <Image src={ContactIcon} alt="Contact Icon" className="contact-icon" />
              </div>
              <div className="item-content">
                <span className="up">Drop us a line:</span>
                <Link href="MailTo:info@hulyax.com.au" className="d-block email-link">
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
