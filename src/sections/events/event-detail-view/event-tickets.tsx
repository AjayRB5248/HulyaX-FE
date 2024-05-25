import { Skeleton } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { usePurchaseTickets, useTicketsView } from "src/api/tickets";
import { useRouter } from "src/routes/hook";

interface IEventTickets {
  eventId: string;
  venueName: string;
  stateId: string;
}

import Ticket01 from "src/assets/frontend/images/event/ticket/ticket01.png";
import Ticket02 from "src/assets/frontend/images/event/ticket/ticket02.png";
import Ticket03 from "src/assets/frontend/images/event/ticket/ticket03.png";
import { checkIfUserIsAuthenticated } from "src/utils/helper";

const ticketIcons: Record<string, StaticImageData> = {
  EARLY_BIRD: Ticket01,
  PREMIUM: Ticket02,
  VIP: Ticket03,
};

const EventTickets: React.FC<IEventTickets> = ({ eventId, venueName, stateId }) => {
  const router = useRouter();

  const { tickets, isLoading } = useTicketsView(eventId, venueName, stateId);

  const purchaseEventMutation = usePurchaseTickets();

  const [ticketQuantities, setTicketQuantities] = useState<{ [key: string]: number }>({});

  const handleIncrement = (ticketId: string) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketId]: (prevQuantities[ticketId] || 0) + 1,
    }));
  };

  const handleDecrement = (ticketId: string) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketId]: Math.max((prevQuantities[ticketId] || 0) - 1, 0),
    }));
  };

  const calculateTotalPrice = (): number => {
    let totalPrice = 0;
    tickets?.forEach((ticket: any) => {
      const quantity = ticketQuantities[ticket._id] || 0;
      totalPrice += quantity * ticket.price;
    });
    return totalPrice;
  };

  const calculateTotalQuantity = (): number => {
    let totalQuantity = 0;

    tickets?.forEach((ticket: any) => {
      const quantity = ticketQuantities[ticket._id] || 0;
      totalQuantity += quantity;
    });

    return totalQuantity;
  };

  const getTicketIcon = (type: string): StaticImageData => {
    return ticketIcons[type?.toUpperCase()] || Ticket01;
  };

  const handlePurchaseTickets = async (
    eventId: string,
    tickets: {
      ticketId: string;
      quantity: number;
    }[]
  ) => {
    const isAuthenticated = checkIfUserIsAuthenticated();
    if (!isAuthenticated) {
      router.push("/auth/user/login");
      localStorage.setItem("currentPath", window.location.pathname);
      return;
    }

    const ticketsToBook = [];

    for (const ticketId in ticketQuantities) {
      if (ticketQuantities.hasOwnProperty(ticketId)) {
        ticketsToBook.push({
          ticketId,
          quantity: ticketQuantities[ticketId],
        });
      }
    }

    await purchaseEventMutation.mutateAsync({
      eventId,
      tickets: ticketsToBook,
    });
  };

  return (
    <>
      <div className="book-ticket--area row justify-content-center">
        {tickets && tickets.length > 0 ? (
          tickets.map((eachTicket: any) => (
            <div className="col-12">
              <div className="ticket-item">
                <div className="ticket-thumb">
                  <Image src={getTicketIcon(eachTicket.type?.toUpperCase()?.replace(" ", "_"))} alt="event" />
                </div>
                <div className="ticket-content">
                  <span className="ticket-title">{eachTicket.type} Ticket</span>
                  <h2 className="amount">
                    <sup>$</sup>
                    {eachTicket.price}
                  </h2>
                  <div className="quantity-selector d-flex align-items-center">
                    <span className="t-button" onClick={() => handleIncrement(eachTicket._id)}>
                      <i className="fas fa-plus"></i>
                    </span>
                    <span className="value">{ticketQuantities[eachTicket._id] || 0}</span>
                    <span className="t-button" onClick={() => handleDecrement(eachTicket._id)}>
                      <i className="fas fa-minus"></i>
                    </span>
                  </div>
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

      {/* Tickets Price */}
      <li>
        <div className="ticket-quantity d-flex align-items-center justify-content-between pt-4 mb-4">
          <span className="ticket-title">Total Tickets</span>
          <span className="quantity">{calculateTotalQuantity()}</span>
        </div>
        <div className="ticket-price d-flex align-items-center justify-content-between mb-0">
          <span className="ticket-title">Tickets Price</span>
          <span className="price">${calculateTotalPrice()}</span>
        </div>
      </li>

      {/* Book Ticket */}
      <button className="theme-button btn-book-ticket mb-10" onClick={() => handlePurchaseTickets(eventId, [])}>
        book tickets
        <i className="fa fa-ticket-alt ml-2"></i>
      </button>
    </>
  );
};

export default EventTickets;
