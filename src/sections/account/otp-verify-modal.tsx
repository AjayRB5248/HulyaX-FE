import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { Link } from "@mui/material";
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: (data: any) => void;
  generateOTPCode:any
  onSubmit:()=> void
};

interface FormValues {
  otp: string; 
}

export default function VerifyOTPModal({ open, onClose, onOk,generateOTPCode }: Props) {
  const verifyOtpSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required'),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      otp: '',
    }),
    []
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(verifyOtpSchema),
    defaultValues,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation(); 
    handleSubmit(onOk)();
  };

  const {
    handleSubmit,
    reset: formReset,
    formState: { errors, isSubmitting, touchedFields },
  } = methods;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '400px' } }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Enter the OTP
        </DialogTitle>

        <DialogContent sx={{ px: 4, py: 2 }}>
          <Stack spacing={3}>
            <RHFTextField name="otp" label="OTP" type="text" error={Boolean(errors.otp)} helperText={errors.otp?.message} />
            <Typography variant="body2">
        {`Don’t have a code? `}
        <Link
          variant="subtitle2"
          sx={{
            cursor: "pointer",
          }}
          onClick={generateOTPCode}
        >
          Resend code
        </Link>
      </Typography>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', padding: 3 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" color="primary" >
            Verify
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
