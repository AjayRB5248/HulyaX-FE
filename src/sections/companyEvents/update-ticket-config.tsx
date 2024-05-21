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
import * as Yup from 'yup';
import { useupdateTicketSettings } from 'src/api/superAdmin';
import { SplashScreen } from 'src/components/loading-screen';

type Props = {
  currentEvent?: any;
};

const ticketDefault = {
  type: '',
  price: 0,
  totalSeats: 0,
};

export default function UpdateTicketSettingsForm({ currentEvent }: Props) {
  const updateTicketMutation = useupdateTicketSettings()
  const params = useParams();
  const router = useRouter();

  const TicketSettingsSchema = Yup.object().shape({
    ticketSettings: Yup.array().of(
      Yup.object().shape({
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

  const currentTicket = currentEvent[0]?.ticketTypes
  if (!currentTicket || currentTicket.length === 0) {
    return <SplashScreen />;
  }

  const defaultValues = useMemo(
    () => ({
      ticketSettings: currentTicket
        ? currentTicket?.map((ticketType: any) => ({
            ticketConfigId:ticketType._id,
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

  const onUpdate = async (data: any) => {
    try {
      const updatePromises = data?.ticketSettings.map((ticketSetting: any) =>
        updateTicketMutation.mutateAsync(ticketSetting)
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
      onSubmit={handleSubmit(onUpdate)}
    >
      <Stack spacing={3}>
        <Grid xs={12}>
          <Typography variant='h4' sx={{ mb: 3 }}>
            Ticket Settings
          </Typography>
          {renderTicketSettings(ticketSettings)}
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

const renderTicketSettings = (ticketSettings: any) => {
  return (
    <Stack spacing={3}>
      {ticketSettings.fields.map((item: any, index: number) => (
        <Card key={item.id} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant='h6'>Ticket Setting {index + 1}</Typography>
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
        disabled 
      >
        Add Ticket Setting
      </Button>
    </Stack>
  );
};
