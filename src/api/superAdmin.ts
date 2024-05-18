import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useRouter } from 'src/routes/hook';
import superAdminService from 'src/services/superAdmin';

export function useApproveCompany() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation(
    ['approveCompany'],
    async (data: any) => {
      const response = await superAdminService.approveCompany(
        data.userId,
        data.isApproved
      );
      return response?.data;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(
          error.response.data.message || 'Error approving company',
          {
            variant: 'error',
          }
        );
      },
      onSuccess: () => {
        enqueueSnackbar('Company Updated Successfully!', {
          variant: 'success',
        });
        queryClient.invalidateQueries(['users']);
      },
    }
  );
}

export function useAssignCompany() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["assignCompany"],
    async (data: any) => {
      const response = await superAdminService.assignCompanyFromEvent(data);
      return response?.data;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || "Error assigning company to event", {
          variant: "error",
        });
      },
      onSuccess: () => {
        enqueueSnackbar("Company Assigned to Event Successfully!", { variant: "success" });
      },
    }
  );
}

export function useRemoveAssginedCompany() {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ["company/remove"],
    async (data: any) => {
      const res = await superAdminService.removeCompanyFromEvent(data);
      return res?.data;
    },
    {
      onError: () => {
        enqueueSnackbar("Error Removing Company from Event", { variant: "error" });
      },
      onSuccess: () => {
        enqueueSnackbar("Company Removed Successfully from Event", { variant: "success" });
      },
    }
  );
}

export function useStates() {
  const { data, isLoading, error, refetch } = useQuery(
    ['states'],
    async () => {
      const res = await superAdminService.state();
      return res?.data;
    },
    {
      keepPreviousData: true,
    }
  );

  const states = useMemo(() => data || [], [data]);

  return {
    states,
    loading: isLoading,
    error,
    refetch,
    stateList: states?.states,
  };
}

export function useAssignedEvents(subEventId?:any) {
  const { data, isLoading, error, refetch } = useQuery(
    ['asssignedEvents'],
    async () => {
      const res = await superAdminService.veiwAssignedEvents(subEventId);
      return res?.data;
    },
    {
      keepPreviousData: true,
    }
  );

  const events = useMemo(() => data || [], [data]);

  return {
    events,
    loading: isLoading,
    error,
    refetch,
    eventList:events?.assignedEvents
  };
}

export function useSetupTicketSettings() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["setupTicketSettings"],
    async (data: any) => {
      const response = await superAdminService.setupTicket(data);
      return response?.data;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || "Error while ticket setup", {
          variant: "error",
        });
      },
      onSuccess: () => {
        enqueueSnackbar("Ticket setted up to Event Successfully!", { variant: "success" });
      },
    }
  );
}

export function useupdateTicketSettings() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["updateTicketSettings"],
    async (data: any) => {
      const response = await superAdminService.updateTicket(data);
      return response?.data;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || "Error while ticket update", {
          variant: "error",
        });
      },
      onSuccess: () => {
        enqueueSnackbar("Ticket updated Successfully!", { variant: "success" });
      },
    }
  );
}