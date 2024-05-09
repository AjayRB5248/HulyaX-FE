import moment from "moment";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import VenueIcon from "src/assets/frontend/images/icons/icons8-location-48.png";

import SACAR from "src/assets/frontend/images/artists/Sacar.jpeg";

const EventGridItem: React.FC<{
  imageUrl: StaticImageData;
  date: string;
  title: string;
  venue: string;
  city: string;
  timeZone: string;
  eventId: string;
  slug: string;
  artists: any;
}> = ({ eventId, imageUrl, date, title, venue, city, timeZone, slug, artists }) => {
  return (
    <div className="col-sm-6 col-lg-4">
      <div className="event-item ml-0 mr-0">
        <div className="event-top-card" style={{ height: "320px" }}>
          <div className="event-date">
            <h6 className="date-title">{moment(date).format("D MMM")}</h6>
          </div>
          <Link href={`/events/${slug}`}>
            <Image src={imageUrl} alt="Event Poster" width={800} height={1200} />

            <h4 className="event-title">{title}</h4>
          </Link>
        </div>

        <div className="event-bottom-card d-flex flex-column p-3">
          <div className="artist d-flex align-items-center">
            <Image src={SACAR} alt="Artist Profile" className="artist-profile-img" />
            <h4 className="artist-name ml-3">
              {artists[0]?.artistName}
              <p className="artist-position">Artist/SongWriter</p>
            </h4>
            {/* <button className="theme-button">Buy Ticket</button> */}
          </div>

          <div className="venue d-flex align-items-center">
            <Image src={VenueIcon} alt="Venue icon" className="venue-icon" />

            <div className="venue-name ml-3">
              {venue}, {city}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="event-grid">
        <div className="movie-thumb c-thumb">
          <Link href={`/event-detail/${slug}`}>
            <Image src={imageUrl} alt="event" width={800} height={1200} />
          </Link>
          <div className="event-date">
            <h6 className="date-title">{moment(date).format("D")}</h6>
            <span>{moment(date).format("MMM")}</span>
          </div>
        </div>
        <div className="movie-content bg-one">
          <h5 className="title m-0">
            <Link href={`/event-detail/${slug}`}>{title}</Link>
          </h5>
          <div className="movie-rating-percent">
            <span>
              {venue} , {city}
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default EventGridItem;
