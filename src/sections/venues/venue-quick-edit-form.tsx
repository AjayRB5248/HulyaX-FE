import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { MenuItem, Stack, Typography } from '@mui/material';
import { IVenueItem } from 'src/types/venue';
import { useStates } from 'src/api/superAdmin';
import { useUpdateVenue } from 'src/api/venues';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentVenue?: IVenueItem;
};

export default function VenueQuickEditForm({
  currentVenue,
  open,
  onClose,
}: Props) {
  const {states}= useStates();
  const venueUpdateMutation = useUpdateVenue(currentVenue?._id);

  const NewUserSchema = Yup.object().shape({
    venueName: Yup.string().required('Venue Name is required'),
    state: Yup.string().required('State is required'),
  });

  const defaultValues = useMemo(
    () => ({
      venueName: currentVenue?.venueName || '',
      state: currentVenue?.state?._id || '',
    }),
    [currentVenue]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = methods;

  const onSubmit = async (data:any) => {
    try {
      const formData = new FormData();
        formData.append(`venueName`, data?.venueName);
        formData.append(`state`, data?.state);
      await venueUpdateMutation.mutateAsync(formData);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Update Venue</DialogTitle>

        <DialogContent sx={{gap:4}}>
        <Stack spacing={2} sx={{marginTop:2}}>
            <RHFTextField name='venueName' label='Venue' />
            <RHFSelect name='state' label='State'>
         {states?.states?.map((state:any) => (
       <MenuItem key={state?._id} value={state?._id}>{state?.stateName}</MenuItem>
        ))}
        </RHFSelect>

        </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant='outlined' onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            type='submit'
            variant='contained'
            loading={isSubmitting}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
