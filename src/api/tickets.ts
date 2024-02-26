import { useQuery } from "@tanstack/react-query";
import TicketService from "src/services/tickets";

export function useTicketsView(eventId: string, venueName: string) {
  const { data, isLoading, isError, error } = useQuery(["viewTickets", eventId, venueName], async () => {
    const response = await TicketService.viewTickets(eventId, venueName);

    return response?.data?.ticket;
  });

  return {
    tickets: data,
    isLoading,
    isError,
    error,
  };
}
