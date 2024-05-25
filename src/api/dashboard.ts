import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import DashboardService from 'src/services/dashboard';

interface QueryParameters {
  fromDate?: number;
  toDate?: number;
  subEventId?: string;
}

export function useDashboardReports(initialQueryParameters?:QueryParameters) {
  const [queryParameters, setQueryParameters] = useState(initialQueryParameters);
  const { data, isLoading, error, refetch } = useQuery(
    ['dashboard/reports', queryParameters],
    async () => {
      const res = await DashboardService.dashboardReport(queryParameters);
      return res?.data;
    },
    {
      keepPreviousData: true,
    }
  );

  const reports = useMemo(() => data || [], [data]);

  const fetchReports = useCallback((newQueryParameters?: any) => {
    setQueryParameters(newQueryParameters);
  }, []);

  return {
    reports,
    loading: isLoading,
    error,
    fetchReports,
  };
}

