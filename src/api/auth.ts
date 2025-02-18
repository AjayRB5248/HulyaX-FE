import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useAuth } from 'src/auth/context/users/auth-context';
import { useRouter } from 'src/routes/hook';
import AuthService from 'src/services/auths';
import { clearTokens, storeTokens } from 'src/utils/token-management';

export const useLogin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();

  return useMutation(
    ['login/verify'],
    async (data: any) => {
      const res = await AuthService.login(data);

      const userData = res.data?.user;
      const accessToken = res.data?.tokens?.access?.token;
      const refreshToken = res.data?.tokens?.refresh?.token;
      const userRole = res.data?.user.role;
      storeTokens(accessToken, refreshToken, userData);

      login(userData, accessToken, refreshToken);

      return res.data;
    },
    {
      onSuccess: (data: any) => {
        return data;
      },
      onError: (error: any) => {
        enqueueSnackbar(
          error?.response?.data?.message || 'Something went wrong',
          {
            variant: 'error',
          }
        );
        return error;
      },
    }
  );
};

export const useRegister = () => {
  const notify = useSnackbar();
  const { register } = useAuth();

  return useMutation(
    ['register'],
    async (data: any) => {
      const res = await AuthService.register(data);

      const userData = res.data?.user;
      const accessToken = res.data?.userToken?.access?.token;
      const refreshToken = res.data?.userToken?.refresh?.token;

      storeTokens(accessToken, refreshToken, userData);

      register(userData, accessToken, refreshToken);

      return res?.data;
    },
    {
      onSuccess: (data: any) => {
        // notify.enqueueSnackbar('User Data Saved Successfully!', {
        //   variant: 'success',
        // });
      },
      onError: (error: any) => {
        notify.enqueueSnackbar(
          error?.response?.data?.message || 'Something went wrong',
          {
            variant: 'error',
          }
        );
        return error;
      },
    }
  );
};

export const verifyEmail = () => {
  const notify = useSnackbar();

  return useMutation(
    ['verifyEmail'],
    async (data: any) => {
      const res = await AuthService.sendEmailVerification(data);
      return res?.data;
    },
    {
      onSuccess: (data: any) => {
        notify.enqueueSnackbar('Email Sent for Verification Successfully!', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        notify.enqueueSnackbar(error?.message || 'Something went wrong', {
          variant: 'error',
        });
        return error;
      },
    }
  );
};

export const sendOTP = () => {
  const notify = useSnackbar();

  return useMutation(
    ['sendOTP'],
    async (data: any) => {
      const res = await AuthService.sendOTP(data);
      return res?.data;
    },
    {
      onSuccess: (data: any) => {
        notify.enqueueSnackbar('OTP Sent Successfully!', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        notify.enqueueSnackbar(
          error?.response?.data?.message || 'Something went wrong',
          {
            variant: 'error',
          }
        );
        return error;
      },
    }
  );
};

export const verifyOTP = () => {
  const notify = useSnackbar();

  return useMutation(
    ['verifyOTP'],
    async (data: any) => {
      const res = await AuthService.verifyOTP(data);
      return res?.data;
    },
    {
      onSuccess: (data: any) => {
        notify.enqueueSnackbar('OTP Verified Successfully!', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        console.log(error, 'error');
        notify.enqueueSnackbar(
          error?.response?.data?.message || 'Something went wrong',
          {
            variant: 'error',
          }
        );
        return error;
      },
    }
  );
};

export const useForgotPassword = () => {
  const notify = useSnackbar();

  return useMutation(
    ['verifyOTP'],
    async (data: any) => {
      const res = await AuthService.forgotPassword(data);
      return res?.data;
    },
    {
      onSuccess: (data: any) => {
        notify.enqueueSnackbar('OTP Sent Successfully!', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        console.log(error, 'error');
        notify.enqueueSnackbar(
          error?.response?.data?.message || 'Something went wrong',
          {
            variant: 'error',
          }
        );
        return error;
      },
    }
  );
};

export const resetPassword = () => {
  const notify = useSnackbar();

  return useMutation(
    ['verifyOTP'],
    async (data: any) => {
      const res = await AuthService.resetPassword(data);
      return res?.data;
    },
    {
      onSuccess: (data: any) => {
        notify.enqueueSnackbar('Password Reset Successfully!', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        console.log(error, 'error');
        notify.enqueueSnackbar(
          error?.response?.data?.message || 'Something went wrong',
          {
            variant: 'error',
          }
        );
        return error;
      },
    }
  );
};

export const useLogout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuth();
  const router = useRouter();

  return useMutation(
    ['logout'],
    async (data: any) => {
      try {
        const res = await AuthService.logout(data).then((res) => res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      } finally {
        clearTokens();
        logout();
        router.push('/');
      }
    },
    {
      onSuccess: (data: any) => {
        enqueueSnackbar('Logout successful', { variant: 'success' });
        return data;
      },
    }
  );
};
