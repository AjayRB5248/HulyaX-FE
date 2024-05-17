import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import StateService from 'src/services/state';

export function useStates() {
  const { data, isLoading, error, refetch } = useQuery(
    ['artists'],
    async () => {
      const res = await StateService.list();
      return res?.data;
    },
    {
      keepPreviousData: true,
    }
  );

  const states = useMemo(() => data || [], [data]);

  return {
    state,
    loading: isLoading,
    error,
    refetch,
    stateData: states?.artists,
  };
}
