import axiosInstance, { endpoints } from "src/utils/axios";

const TicketService = {
  viewTickets: (eventId: string, venueName: string) =>
    axiosInstance.post(endpoints.tickets.list, { eventId, venueName }),
};

export default TicketService;
