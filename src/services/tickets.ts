import axiosInstance, { endpoints } from "src/utils/axios";

const TicketService = {
  viewTickets: (eventId: string, venueName: string) =>
    axiosInstance.post(endpoints.tickets.list, { eventId, venueName }),

  purchaseTickets: (
    eventId: string,
    tickets: {
      ticketId: string;
      quantity: number;
    }[]
  ) => axiosInstance.post(endpoints.tickets.purchase, { eventId, tickets }),
};

export default TicketService;
