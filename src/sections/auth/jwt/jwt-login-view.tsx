'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// auth

import { useForgotPassword, useLogin } from 'src/api/auth';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useAuth } from 'src/auth/context/users/auth-context';
import { enqueueSnackbar } from 'notistack';

export default function JwtRegisterView() {
  const {user} = useAuth();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const loginMutation = useLogin();
  const forgotPasswordMutation = useForgotPassword();

  useEffect(() => {
    if (user && !(user.role==='customer')) {
      router.push(paths.dashboard.root);
    }
  }, [user]);

  const defaultValues = {
    email: '',
    password: '',
  };

  const [loggedInUser, setLoggedInUser] = useState(defaultValues);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const loginPayload = {
        email: data?.email,
        password: data?.password,
      };

      const result = await loginMutation.mutateAsync(loginPayload);
      if(result?.user && !(result?.user?.role==='customer')){
        enqueueSnackbar("Login successful", { variant: "success" });
        router.push(returnTo || PATH_AFTER_LOGIN);
      }else{
        enqueueSnackbar('You are not Authorized User',{variant: "error"})
      }
    } catch (error) {
      console.error(error, 'this is data');
      reset();
      setErrorMsg(
        typeof error === 'string' ? error : error.response.data.message
      );
    }
  });

  const forgotPassword = async () => {
    setLoggedInUser(methods.getValues());
    try {
      const payload = {
        email: loggedInUser?.email,
        tokenType: 'OTP_RESET_PASSWORD',
      };
      await forgotPasswordMutation.mutateAsync(payload);

      router.push('/auth/company/reset-password');
    } catch (error) {
      console.error(error);
    }
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant='h4'>Sign in to Hulya Events</Typography>

      <Stack direction='row' spacing={0.5}>
        <Typography variant='body2'>New user?</Typography>

        <Link
          component={RouterLink}
          href={paths.auth.company.register}
          variant='subtitle2'
        >
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity='error'>{errorMsg}</Alert>}

        <RHFTextField name='email' label='Email address'  InputLabelProps={{ shrink: true }}/>

        <RHFTextField
          name='password'
          label='Password'
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={password.onToggle} edge='end'>
                  <Iconify
                    icon={
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Link
          variant='body2'
          color='inherit'
          underline='always'
          sx={{ alignSelf: 'flex-end', cursor: 'pointer' }}
          // onClick={forgotPassword}
          href={paths.auth.company.forgotPassword}
        >
          Forgot password?
        </Link>

        <LoadingButton
          fullWidth
          color='inherit'
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}
    </>
  );
}
