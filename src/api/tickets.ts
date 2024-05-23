import { useRouter } from "src/routes/hook";
import { useMutation, useQuery } from "@tanstack/react-query";
import TicketService from "src/services/tickets";
import { useSnackbar } from "notistack";

export function useTicketsView(eventId: string, venueName: string, stateId: string) {
  const { data, isLoading, isError, error } = useQuery(["viewTickets", eventId, venueName], async () => {
    const response = await TicketService.viewTickets(eventId, stateId);

    return response?.data?.ticket;
  });

  return {
    tickets: data,
    isLoading,
    isError,
    error,
  };
}

export function usePurchaseTickets() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["purchaseTickets"],
    async (data: any) => {
      const response = await TicketService.purchaseTickets(data.eventId, data.tickets);
      return response?.data?.ticket;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || "Error booking event", {
          variant: "error",
        });
      },
      onSuccess: (ticket) => {
        enqueueSnackbar("Event Booked successfully", { variant: "success" });
        if (ticket) {
          router.push(ticket);
        }
      },
    }
  );
}
