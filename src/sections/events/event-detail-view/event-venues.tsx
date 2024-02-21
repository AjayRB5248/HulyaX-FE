import moment from "moment";
import Image from "next/image";
import Link from "next/link";

import VenueIcon from "src/assets/frontend/images/event/icon/event-icon02.png";
import ContactIcon from "src/assets/frontend/images/event/icon/event-icon03.png";

const EventVenues: React.FC<any> = ({ venues }) => {
  return (
    <section className="book-section">
      <div className="container-fluid">
        <div className="book-wrapper offset-lg-3">
          <div className="left-side">
            {venues?.map((eachVenue: any) => (
              <div className="item">
                <div className="item-thumb">
                  <Image src={VenueIcon} alt={eachVenue.venueName} className="venue-icon" />
                </div>
                <div className="item-content">
                  <span className="up">{eachVenue.venueName}, </span>
                  <span>{eachVenue.city}</span>
                  <div className="item-date">{moment(eachVenue.eventDate).format("MMM DD, YYYY")}</div>
                </div>
              </div>
            ))}
            <div className="item">
              <div className="item-thumb">
                <Image src={ContactIcon} alt="Contact Icon" className="contact-icon" />
              </div>
              <div className="item-content">
                <span className="up">Drop us a line:</span>
                <Link href="MailTo:info@hulyaevents.com.au" className="d-block email-link">
                  info@hulyaevents.com.au
                </Link>
              </div>
            </div>
          </div>
          <a href="#0" className="custom-button">
            <i className="fa fa-ticket-alt mr-2"></i>
            book tickets
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventVenues;
