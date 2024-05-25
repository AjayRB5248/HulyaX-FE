import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import UsersService from 'src/services/users';

interface QueryParameters {
  page?: number;
  limit?: number;
}

export function useUsers(queryParameters: QueryParameters = {}) {
  const { data, isLoading, error } = useQuery(
    ['users'],
    async () => {
      const res = await UsersService.list(queryParameters);
      return res?.data;
    },
    {
      keepPreviousData: true,
    }
  );
  const users = useMemo(() => data?.users || [], [data?.users]);

  return {
    users,
    totalResults: data?.totalCount || 0,
    loading: isLoading,
    error,
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

export function useAllUsersByRole(role: string) {
  const { data, isLoading, error } = useQuery(
    ['useAllUsersByRole'],
    async () => {
      const res = await UsersService.alUserByRole(role);
      return res?.data;
    },
    {
      keepPreviousData: true,
    }
  );
  const users = useMemo(() => data?.users || [], [data?.users]);

  return {
    users: users,
    totalResults: data?.totalResults || 0,
    loading: isLoading,
    error,
  };
}
