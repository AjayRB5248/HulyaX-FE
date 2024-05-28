import Image from "next/image";
import React, { useState } from "react";

import { EVENTS_LINK } from "../eventsLinkData";
import Link from "next/link";

interface IEventTickets {
  eventName: string;
  eventImage: string;
  state: string;
  venue: string;
  eventDate: string;
}

const EventsLink: React.FC<IEventTickets> = ({ eventName, eventImage, eventDate, state, venue }) => {
  const getExternalLinkToTicket = () => {
    const externalLink = EVENTS_LINK?.find(
      (eventLink: any) => eventLink?.state === state && eventLink?.venue === venue
    );

    return externalLink;
  };

  return (
    <>
      {getExternalLinkToTicket() ? (
        <div className="events-external-link-wrapper row justify-content-center">
          <div className="col-4 event-image-wrapper">
            <Image src={eventImage} alt={eventName} height={150} width={150} />
          </div>
          <div className="col-8 event-image-wrapper">
            <h3>{eventName}</h3>
            <p>
              {venue}, {state}
            </p>
            <p>{eventDate}</p>
            <Link href={getExternalLinkToTicket()?.link ?? ""} target="_blank">
              <button className={`theme-button btn-book-ticket mb-10`}>Get Your Tickets Now</button>
            </Link>
          </div>
        </div>
      ) : (
        <p className="info-message">No Tickets Available, Please choose other venue!</p>
      )}
    </>
  );
};

export default EventsLink;
