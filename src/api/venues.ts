import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useRouter } from 'src/routes/hook';
import VenueService from 'src/services/venue';

export function useCreateVenue() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ['craeteVenue'],
    async (formData: any) => {
      const response = await VenueService.createVenue(formData);
      return response?.data?.user;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || 'Error creating venue', {
          variant: 'error',
        });
      },
      onSuccess: () => {
        enqueueSnackbar('Venue Created Successfully!', { variant: 'success' });
      },
    }
  );
}

export function useVenues() {
  const { data, isLoading, error, refetch } = useQuery(
    ['venues'],
    async () => {
      const res = await VenueService.list();
      return res?.data;
    },
    {
      keepPreviousData: true,
    }
  );

  const venues = useMemo(() => data || [], [data]);

  return {
    venues,
    loading: isLoading,
    error,
    refetch,
    data: venues?.venues,
  };
}

export function useUpdateVenue(id: any) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation(
    ['updateUserAvatar'],
    async (formData: any) => {
      const response = await VenueService.updateVenue(id, formData);
      return response?.data?.user;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || 'Error updating venue', {
          variant: 'error',
        });
      },
      onSuccess: () => {
        enqueueSnackbar('Venue Updated Successfully!', { variant: 'success' });
        queryClient.invalidateQueries(['venues']);
      },
    }
  );
}

export function useRemoveVenue() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    ['venue/remove'],
    async (id: string) => {
      const res = await VenueService.removeVenue(id);
      return res?.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Removing Venue', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Venue Removed Successfully', { variant: 'success' });
        queryClient.invalidateQueries(['venues']);
      },
    }
  );
}
