import { Skeleton } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { useTicketsView } from "src/api/tickets";

interface IEventTickets {
  eventId: string;
  venueName: string;
}

import Ticket01 from "src/assets/frontend/images/event/ticket/ticket01.png";
import Ticket02 from "src/assets/frontend/images/event/ticket/ticket02.png";
import Ticket03 from "src/assets/frontend/images/event/ticket/ticket03.png";

const ticketIcons: Record<string, StaticImageData> = {
  STANDARD: Ticket01,
  PREMIUM: Ticket02,
  VIP: Ticket03,
};

const EventTickets: React.FC<IEventTickets> = ({ eventId, venueName }) => {
  const { tickets, isLoading } = useTicketsView(eventId, venueName);

  const getTicketIcon = (type: string): StaticImageData => {
    return ticketIcons[type?.toUpperCase()] || Ticket01;
  };



  return (
    <div className="book-ticket--area row justify-content-center">
      {tickets && tickets.length > 0 ? (
        tickets.map((eachTicket: any) => (
          <div className="col-12">
            <div className="ticket-item">
              <div className="ticket-thumb">
                <Image src={getTicketIcon(eachTicket.type)} alt="event" />
              </div>
              <div className="ticket-content">
                <span className="ticket-title">{eachTicket.type} Ticket</span>
                <h2 className="amount">
                  <sup>$</sup>
                  {eachTicket.price}
                </h2>
                <span className="t-button">
                  <i className="fas fa-plus"></i>
                </span>
              </div>
            </div>
          </div>
        ))
      ) : isLoading ? (
        <Skeleton animation="wave" />
      ) : (
        // TODO: Tickets Sold out messages info here
        <p className="info-message">No Tickets Available, Please choose other venue!</p>
      )}
    </div>
  );
};

export default EventTickets;
