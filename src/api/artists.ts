import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import ArtistService from 'src/services/artists';

export function useCreateArtistProfile() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ['craeteArtistProfile'],
    async (data: any) => {
      const response = await ArtistService.createArtist(data);
      return response?.data?.user;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(
          error.response.data.message || 'Error creating artist profile',
          {
            variant: 'error',
          }
        );
      },
      onSuccess: () => {
        enqueueSnackbar('Artist Created Successfully!', { variant: 'success' });
        router.push(paths.dashboard.artist.list);
      },
    }
  );
}

export function useArtists() {
  const { data, isLoading, error, refetch } = useQuery(
    ['artists'],
    async () => {
      const res = await ArtistService.list();
      return res?.data;
    },
    {
      keepPreviousData: true,
    }
  );

  const artists = useMemo(() => data || [], [data]);

  return {
    artists,
    loading: isLoading,
    error,
    refetch,
    artistsData: artists?.artists,
  };
}

export function useUpdateArtistProfile(id: any) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation(
    ['updateArtistProfile'],
    async (data: any) => {
      const response = await ArtistService.updateArtist(id, data);
      return response?.data?.user;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(
          error.response.data.message || 'Error updating profile',
          {
            variant: 'error',
          }
        );
      },
      onSuccess: () => {
        enqueueSnackbar('Artist Info Successfully!', { variant: 'success' });
        queryClient.invalidateQueries(['artists']);
      },
    }
  );
}

export function useRemoveArtist() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    ['artist/remove'],
    async (id: string) => {
      const res = await ArtistService.removeArtist(id);
      return res?.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Removing Artist', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Artist Removed Successfully', { variant: 'success' });
        queryClient.invalidateQueries(['artists']);
      },
    }
  );
}
