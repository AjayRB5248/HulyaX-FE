import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import FAQService from 'src/services/faqs';

export function useCreateFAQ() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ['craeteFAQ'],
    async (data: any) => {
      const response = await FAQService.createFAQ(data);
      return response?.data?.user;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(
          error.response.data.message || 'Error sending FAQ request',
          {
            variant: 'error',
          }
        );
      },
      onSuccess: () => {
        enqueueSnackbar('FAQ sent Successfully!', { variant: 'success' });
      },
    }
  );
}



