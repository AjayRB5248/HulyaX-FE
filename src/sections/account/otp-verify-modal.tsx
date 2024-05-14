import React, { useEffect, useMemo, useState } from 'react';
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
  Link,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: (data: any) => void;
  generateOTPCode: any;
};

interface FormValues {
  otp: string; 
}

export default function VerifyOTPModal({ open, onClose, onOk, generateOTPCode }: Props) {
  const [timer, setTimer] = useState(0);

  const verifyOtpSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required'),
  });

  const defaultValues = useMemo<FormValues>(() => ({ otp: '' }), []);
  const methods = useForm<FormValues>({
    resolver: yupResolver(verifyOtpSchema),
    defaultValues,
  });

  useEffect(() => {
    let interval:any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (open) {
      setTimer(60);  
    } else {
      setTimer(0);  
    }
  }, [open]);

  const handleResendOTP = () => {
    if (timer === 0) {
      setTimer(60);
      generateOTPCode("OTP_MOBILE");
    }
  };

  const onSubmit = (data:any, event:any) => {
    event.preventDefault();  
    event.stopPropagation(); 
    onOk(data); 
  };

  const {
    handleSubmit,
    reset: formReset,
    formState: { errors, isSubmitting, touchedFields },
  } = methods;

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        formReset(); 
      }}
      sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '400px' } }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Enter the OTP
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 2 }}>
          <Stack spacing={3}>
            <RHFTextField name="otp" label="OTP" type="text" error={Boolean(errors.otp)} helperText={errors.otp?.message} />
            <Typography variant="body2">
              {`Don’t have a code? `}
              {timer > 0 ? (
                `Please wait ${timer} seconds`
              ) : (
                <Link
              variant="subtitle2"
              sx={{
                cursor: "pointer",
              }}
              onClick={handleResendOTP}
            >
              Resend code
            </Link>

              )}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: 3 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
            Verify
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
