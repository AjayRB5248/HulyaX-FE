import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import UsersService from 'src/services/users';

export function useUsers(queryParameters?: any) {
  const { data, isLoading, error, refetch } = useQuery(
    ['users'],
    async () => {
      const res = await UsersService.list(queryParameters);
      return res?.data;
    },
    {
      keepPreviousData: true,
    }
  );

  const users = useMemo(() => data || [], [data]);

  return {
    users,
    loading: isLoading,
    error,
    refetch,
  };
}

export function useRemoveUser() {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ['user/remove'],
    async (eventId: string) => {
      const res = await UsersService.remove(eventId);
      return res?.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Removing User', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('User Removed Successfully', { variant: 'success' });
      },
    }
  );
}

export function useUpdateUser() {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ['user/update'],
    async (item: any) => {
      const { data, userId } = item;

      const response = await UsersService.update(userId, data);
      return response?.data;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || 'Error updating user', {
          variant: 'error',
        });
      },
    }
  );
}
