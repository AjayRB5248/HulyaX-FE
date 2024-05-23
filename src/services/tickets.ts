import axiosInstance, { endpoints } from "src/utils/axios";

const TicketService = {
  viewTickets: (eventId: string, state: string) => axiosInstance.post(endpoints.tickets.list, { eventId, state }),

  purchaseTickets: (
    eventId: string,
    tickets: {
      ticketId: string;
      quantity: number;
    }[]
  ) => axiosInstance.post(endpoints.tickets.purchase, { tickets }),
};

export default TicketService;
