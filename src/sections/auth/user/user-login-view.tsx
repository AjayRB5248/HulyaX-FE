'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useForgotPassword, useLogin } from 'src/api/auth';
import FormProvider from 'src/components/hook-form';
import * as Yup from 'yup';

import { useState } from 'react';

import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import { useAuth } from 'src/auth/context/users/auth-context';
import withAuth from 'src/hoc/withAuth';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

interface FormData {
  email: string;
  password: string;
}

const UserRegisterView: React.FC = () => {
  const router = useRouter();
  const loginMutation = useLogin();
  const forgotPasswordMutation = useForgotPassword();
  const { user } = useAuth();

  // useEffect(() => {
  //   if (user) {
  //     router.push('/');
  //   }
  // }, [user]);

  const defaultValues: FormData = {
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

  const methods = useForm<FormData>({
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
      await loginMutation.mutateAsync(data);
      enqueueSnackbar('Login successful', { variant: 'success' });

      const pathToRedirect = localStorage.getItem('currentPath');

      if (pathToRedirect) {
        localStorage.removeItem('currentPath');
        router.push(pathToRedirect);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      reset();
    }
  });

  return (
    <section
      className='account-section d-flex align-items-center justify-content-center'
      // style={{ backgroundImage: `url(${LoginBg.src})` }}
    >
      <div className='account-area'>
        <div className='section-header-3'>
          <span className='cate'>Welcome to HulyaX</span>
          <h4 className='title'>
            Elevate Your Experience – Login for Hassle-Free Ticketing!
          </h4>
        </div>

        <FormProvider
          methods={methods}
          onSubmit={onSubmit}
          className={'account-form'}
        >
          <div className='form-group'>
            <label htmlFor='email'>
              Email <span>*</span>
            </label>
            <input
              type='text'
              placeholder='Enter Your Email'
              id='email'
              {...methods.register('email')}
            />
            <p className='text-danger'>
              {methods.formState.errors.email?.message}
            </p>
          </div>

          <div className='form-group'>
            <label htmlFor='password'>
              Password <span>*</span>
            </label>
            <input
              type='password'
              placeholder='Password'
              id='password'
              {...methods.register('password')}
            />
            <p className='text-danger'>
              {methods.formState.errors.password?.message}
            </p>
          </div>

          <div className='option text-right'>
            <Link href='/auth/user/forgot-password'> Forgot Password? </Link>
          </div>

          <div className='form-group text-center'>
            <button type='submit' className='btn-loading'>
              <span>Sign In</span>
            </button>
          </div>
        </FormProvider>

        <div className='option'>
          New user? <Link href={paths.auth.user.register}>Sign Up Now</Link>
        </div>
      </div>
    </section>
  );
};

export default withAuth(UserRegisterView, []);
