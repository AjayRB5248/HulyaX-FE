import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
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
import { Typography } from '@mui/material';
import { IArtistItem } from 'src/types/artist';
import { useCreateArtistProfile } from 'src/api/artists';
import { fData } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentUser?: IArtistItem;
};

export default function ArtistQuickEditForm({
  currentUser,
  open,
  onClose,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const astistUpdateMutation = useCreateArtistProfile();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    genre: Yup.string().required('Artist Genre is required'),
    artisrProfile: Yup.string().required('Artist profile is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      genre: currentUser?.genre || '',
      artisrProfile: currentUser?.artisrProfile || '',
    }),
    [currentUser]
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
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await astistUpdateMutation
        .mutateAsync({
          data,
          id: currentUser?.id,
        })
        .then(() => {
          reset();
          onClose();
          enqueueSnackbar('Update success!');
        });
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('artisrProfile', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

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
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Artist Update</DialogTitle>

        <DialogContent >

          <Box
            rowGap={3}
            columnGap={2}
            display='grid'
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            sx={{ mt: 3 }}
          >
            <RHFUploadAvatar
                name="artisrProfile"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            <RHFTextField name='name' label='Full Name' />
            <RHFTextField name='genre' label='Genre' />
            </Box>
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
