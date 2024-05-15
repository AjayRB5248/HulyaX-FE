import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Grid, Stack, Typography, MenuItem, useTheme, useMediaQuery } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
import { useCreateVenue } from 'src/api/venues';
import { useStates } from 'src/api/superAdmin';

const VenueNewEditForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const {states}= useStates();
  const { enqueueSnackbar } = useSnackbar();
  const addVenuesMutation = useCreateVenue()

  const VenueSchema = Yup.object().shape({
    venues: Yup.array().of(
      Yup.object().shape({
        venueName: Yup.string().required('Venue name is required'),
        state: Yup.string().required('State is required'),
      })
    ),
  });

  const defaultValues = useMemo(() => ({
    venues: [{ venueName: '', state: '' }],
  }), []);

  const methods = useForm({
    resolver: yupResolver(VenueSchema),
    defaultValues,
  });

  const { control, handleSubmit, reset, formState: { isSubmitting } } = methods;
  const venues = useFieldArray({ control, name: "venues" });

  const onSubmit = async (data:any) => {
    try {
      const formData = new FormData();
      data.venues.forEach((venue:any, index:any) => {
        formData.append(`venues[${index}][venueName]`, venue.venueName);
        formData.append(`venues[${index}][state]`, venue.state);
      });
      await addVenuesMutation.mutateAsync(formData);
      reset();
      router.push(paths.dashboard.venue.list);
    } catch (error) {
      console.error('Error adding venues:', error);
      enqueueSnackbar('Failed to add venues!', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        {venues?.fields?.map((item, index) => (
          <Grid item xs={12} key={item.id} spacing={3}>
            <Card sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>Venue {index + 1}</Typography>
              <Stack direction={isMobile ? "column" : "row"} spacing={3} alignItems="center">
                <RHFTextField name={`venues[${index}].venueName`} label="Venue Name" required />
                <RHFSelect name={`venues[${index}].state`} label="State" required>
                  {states?.states?.map((state:any) => (
                    <MenuItem key={state?._id} value={state?._id}>{state?.stateName}</MenuItem>
                  ))}
                </RHFSelect>
                <Button onClick={() => venues.remove(index)} color="error">Remove</Button>
              </Stack>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button onClick={() => venues.append({ venueName: '', state: ''})} color="primary">
            Add New Venue
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 4 }}>
          <Button type="submit" variant="contained" loading={isSubmitting}>
            Submit Venues
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default VenueNewEditForm;
