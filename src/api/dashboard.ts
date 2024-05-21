import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import DashboardService from 'src/services/dashboard';

interface QueryParameters {
  fromDate?: number;
  toDate?: number;
  subEventId?: string;
}

export function useDashboardReports(queryParameters?: QueryParameters) {
  const { data, isLoading, error, refetch } = useQuery(
    ['dashboard/reports'],
    async () => {
      const res = await DashboardService.dashboardReport(queryParameters);
      return res?.data;
    },
    {
      keepPreviousData: true,
    }
  );

  const reports = useMemo(() => data || [], [data]);

  return {
    reports,
    loading: isLoading,
    error,
    refetch,
  };
}

