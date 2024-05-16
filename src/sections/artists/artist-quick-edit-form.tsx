import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { fData } from 'src/utils/format-number';
import { IArtistItem } from 'src/types/artist';
import { useCreateArtistProfile, useUpdateArtistProfile } from 'src/api/artists';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentArtist?: IArtistItem;
};

const ArtistQuickEditForm = ({ currentArtist, open, onClose }:Props) => {
  const artistUpdateMutation = useUpdateArtistProfile(currentArtist?._id);

  const schema = Yup.object().shape({
    artistName: Yup.string().required('Artist Name is required'),
    category: Yup.string().required('Category is required'),
    profileImage: Yup.mixed().required('Artist profile is required'),
  });

  const defaultValues = useMemo(() => ({
    artistName: currentArtist?.artistName || '',
    category: currentArtist?.category || '',
    profileImage: currentArtist?.images?.find((img:any) => img.isProfile)?.imageurl || '',
  }), [currentArtist]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('artistName', data.artistName);
    formData.append('category', data.category);
    if (data.profileImage instanceof File) {
      formData.append('profileImage', data.profileImage, data.profileImage.name);
    }
    try {
      await artistUpdateMutation.mutateAsync( formData );
      reset();
      onClose();
    } catch (error) {
      console.error('Update Error:', error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      // setFile(acceptedFiles);
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('profileImage', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Update Artist</DialogTitle>
        <DialogContent>
            <Stack spacing={3}>
            <RHFUploadAvatar
              name="profileImage"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography variant="caption" sx={{ mt: 2, textAlign: 'center', color: 'text.disabled' }}>
                  Allowed *.jpeg, *.jpg, *.png, *.gif<br/>max size of {fData(3145728)}
                </Typography>
              }
            />
            <RHFTextField name="artistName" label="Artist Name" />
            <RHFTextField name="category" label="Category" />
            </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>Update</LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default ArtistQuickEditForm;
