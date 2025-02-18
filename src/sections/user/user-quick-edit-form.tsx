import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
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
import MenuItem from '@mui/material/MenuItem';
// _mock
import { USER_ROLE_OPTIONS } from 'src/_mock';
// types
import { IUserItem } from 'src/types/user';
// assets
// components
import { useUpdateUser } from 'src/api/users';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useApproveCompany } from 'src/api/superAdmin';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentUser?: IUserItem;
};

export default function UserQuickEditForm({
  currentUser,
  open,
  onClose,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const userUpdateMutation = useUpdateUser();
  const approveCompanyMutation=useApproveCompany()
  const [isCompanyApproved, setIsCompanyApproved] = useState(currentUser?.isApproved ?? false);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    mobileNumber: Yup.string().required('Phone number is required'),
    role: Yup.string().required('Role is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      mobileNumber: currentUser?.mobileNumber || '',
      role: currentUser?.role || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data:any) => {
    try {
      delete data?.role;
      delete data?.mobileNumber;

      await userUpdateMutation
        .mutateAsync({
          data,
          userId: currentUser?._id,
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

  const handleApprovalChange = async (event:any) => {
    const isChecked = event.target.checked;
  
    setIsCompanyApproved(isChecked);
  
    const payload = {
      userId: currentUser?._id,
      isApproved: isChecked
    };
  
    await approveCompanyMutation.mutateAsync(payload);
    onClose()
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
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Quick Update</DialogTitle>

        <DialogContent>
          {currentUser?.role==='companyAdmin' && !currentUser?.isApproved && <Alert variant='outlined' severity='info' sx={{ mb: 3 }}>
            Company is waiting for confirmation
          </Alert>}

          <Box
            rowGap={3}
            columnGap={3}
            display='grid'
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            sx={{marginTop: 2}}
          >

            <RHFTextField name='name' label='Full Name' />
            <RHFTextField name='email' label='Email Address' />
            <RHFTextField name='mobileNumber' label='Mobile Number' disabled />
            {currentUser?.role === 'companyAdmin' && (
              <FormControlLabel
                control={<Checkbox checked={isCompanyApproved} onChange={handleApprovalChange} />}
                label="Approve Company"
              />
            )}
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
