import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
// components
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form';
// types
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { useVenues } from 'src/api/venues';
import * as Yup from 'yup';
import { useSetupTicketSettings } from 'src/api/superAdmin';
import { useUsers } from 'src/api/users';
import { useAuth } from 'src/auth/context/users/auth-context';
import { enqueueSnackbar } from 'notistack';

type Props = {
  currentTicket?: any;
};

const ticketDefault = {
  type: '',
  price: 0,
  totalSeats: 0,
  venueInfo: '',
};

export default function TicketSettingsForm({ currentTicket }: Props) {
  const setupTicketMutation = useSetupTicketSettings();
  const params = useParams(); 
  const router = useRouter();
  const { venues } = useVenues(currentTicket?.[0]?.state?._id);

  const TicketSettingsSchema = Yup.object().shape({
    ticketSettings: Yup.array().of(
      Yup.object().shape({
        companyId: Yup.string().optional(),
        venueInfo: Yup.string().required('Venue is required'),
        type: Yup.string().required('Ticket type is required'),
        price: Yup.number()
          .positive('Price must be positive')
          .required('Price is required'),
        totalSeats: Yup.number()
          .integer()
          .positive('Total seats must be a positive integer')
          .required('Total seats are required'),
      })
    ),
  });


  const defaultValues = useMemo(
    () => ({
      ticketSettings: currentTicket
        ? currentTicket?.map((ticketType: any) => ({
            venueInfo: ticketType.venueId,
            type: ticketType.type,
            price: ticketType.price,
            totalSeats: ticketType.totalSeats,
          }))
        : [ticketDefault],
    }),
    [currentTicket]
  );

  const methods = useForm({
    resolver: yupResolver(TicketSettingsSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = methods;

  const ticketSettings = useFieldArray({
    control,
    name: 'ticketSettings',
  });

  useEffect(() => {
    if (currentTicket) {
      reset(defaultValues);
    }
  }, [currentTicket, defaultValues, reset]);

  const onSubmit = async (data: any) => {
    try {
      const payload = { eventId: params?.id };
      const updatePromises = data.ticketSettings.map((ticketSetting: any) =>
      setupTicketMutation.mutateAsync({ ...payload, ...ticketSetting })
    );

    await Promise.all(updatePromises);
    router.push(paths.dashboard.companyEvents.details(params?.id as any))
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <Grid xs={12}>
          <Typography variant='h4' sx={{ mb: 3 }}>
            Ticket Settings
          </Typography>
          {renderTicketSettings(ticketSettings, venues?.venues)}
        </Grid>
      </Stack>

      <Stack spacing={3}>
        <Grid xs={12}>
          <LoadingButton
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            loading={isSubmitting}
            sx={{ mt: 3 }}
          >
            {currentTicket?._id ? 'Update Ticket' : 'Submit Ticket'}
          </LoadingButton>
        </Grid>
      </Stack>
    </FormProvider>
  );
}

const renderTicketSettings = (ticketSettings: any, venues: any) => {
  return (
    <Stack spacing={3}>
      {ticketSettings.fields.map((item: any, index: number) => (
        <Card key={item.id} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant='h6'>Ticket Setting {index + 1}</Typography>
            <RHFSelect
              name={`ticketSettings[${index}].venueInfo`}
              label='Venue'
              required
            >
              {venues?.map((venue: any) => (
                <MenuItem key={venue?._id} value={venue?._id}>
                  {venue?.venueName}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField
              name={`ticketSettings[${index}].type`}
              label='Ticket Type'
              required
            />
            <RHFTextField
              name={`ticketSettings[${index}].price`}
              label='Price'
              type='number'
              required
            />
            <RHFTextField
              name={`ticketSettings[${index}].totalSeats`}
              label='Total Seats'
              type='number'
              required
            />
            <Button
              variant='outlined'
              color='error'
              onClick={() => ticketSettings.remove(index)}
            >
              Remove Ticket Setting
            </Button>
          </Stack>
        </Card>
      ))}
      <Button
        variant='contained'
        onClick={() => ticketSettings.append(ticketDefault)}
      >
        Add Ticket Setting
      </Button>
    </Stack>
  );
};
