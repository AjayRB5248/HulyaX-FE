'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useRegister, verifyEmail } from 'src/api/auth';
import FormProvider from 'src/components/hook-form';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { MenuItem, Select } from '@mui/material';
import parsePhoneNumberFromString, { isValidPhoneNumber } from 'libphonenumber-js';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from 'src/auth/context/users/auth-context';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import countryCodeList from 'src/utils/countryCode';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobileNumber: string;
  countryCode: string;
}

const UserRegisterView: React.FC = () => {
  const router = useRouter();
  const registerMutation = useRegister();
  const verifyEmailMutation = verifyEmail();

  const { user } = useAuth();

  // useEffect(() => {
  //   if (user) {
  //     router.push('/');
  //   }
  // }, [user]);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('User Full Name required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    mobileNumber: Yup.string()
      .required('Mobile Number is required')
      .test(
        'isValidMobileNumber',
        'Invalid mobile number',
        (value, context) => {
          const { countryCode } = context.parent;
          const countryShortCode :any = countryCodeList.find(
            (item) => item.Iso === countryCode
          )?.countryCode;
          return isValidPhoneNumber(value, countryShortCode);
        }
      ),
    countryCode: Yup.string().required('Country code is required'),
  });

  const defaultValues: FormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    countryCode: '+977',
  };

  const methods = useForm<FormData>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const sendVerificationEmail = async (userData: any) => {
    try {
      if (userData) {
        await verifyEmailMutation.mutateAsync(userData);
      } else {
        console.error('User is not available');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const countryShortCode :any = countryCodeList.find(
      (item) => item.Iso === data.countryCode
    )?.countryCode;

    // Parse and format the phone number
    const parsedPhoneNumber = parsePhoneNumberFromString(
      data?.mobileNumber,
      countryShortCode
    );
    const formattedPhoneNumber = parsedPhoneNumber
    ? parsedPhoneNumber.formatInternational().replace(/\s+/g, '')
    : data.mobileNumber;

    try {
      const registerPayload = {
        name: data.name,
        email: data.email,
        password: data.password,
        mobileNumber: formattedPhoneNumber,
      };
      await registerMutation.mutateAsync(registerPayload);
      router.push('/auth/user/verifyOTP');
    } catch (error) {
      console.error(error);
      reset();
    }
  });

  return (
    <section className='account-section account-section--register d-flex align-items-center justify-content-center'>
      <div className='account-area'>
        <div className='section-header-3'>
          <span className='cate'>Welcome to HulyaX </span>
          <h4 className='title'>
            Elevate Your Experience – Register Today for Hassle-Free Event
            Ticketing!
          </h4>
        </div>

        {/* Form Starts */}
        <FormProvider
          methods={methods}
          onSubmit={onSubmit}
          className={'account-form'}
        >
          <div className='form-group'>
            <label htmlFor='fullName'>
              Full Name<span>*</span>
            </label>
            <input
              type='text'
              placeholder='Enter Your Full Name'
              id='fullName'
              {...methods.register('name')}
            />
            <p className='text-danger'>
              {methods.formState.errors.name?.message}
            </p>
          </div>

          <div className='form-group'>
            <label htmlFor='email'>
              Email<span>*</span>
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
            <label htmlFor='mobileNumber'>
              Mobile Number<span>*</span>
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Controller
                name='countryCode'
                control={control}
                defaultValue='+977'
                render={({ field }) => (
                  <Select {...field}>
                    {countryCodeList
                      .filter((item) =>
                        ['NP', 'AU'].includes(item?.countryCode)
                      )
                      .map((item) => (
                        <MenuItem key={item.name} value={item?.Iso}>
                          {item?.Iso}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              <Controller
                name='mobileNumber'
                control={control}
                render={({ field }) => (
                  <input
                    type='text'
                    {...field}
                    placeholder='Enter Your Mobile Number'
                  />
                )}
              />
            </div>
            <p className='text-danger'>
              {methods.formState.errors.mobileNumber?.message}
            </p>
          </div>

          <div className='form-group'>
            <label htmlFor='password'>
              Password<span>*</span>
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

          <div className='form-group'>
            <label htmlFor='pass2'>
              Confirm Password<span>*</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              id='pass2'
              {...methods.register('confirmPassword')}
            />
            <p className='text-danger'>
              {methods.formState.errors.confirmPassword?.message}
            </p>
          </div>

          <div className='form-group text-center mt-5'>
            <LoadingButton
              type='submit'
              className='btn-loading'
              loadingPosition='start'
              loading={isSubmitting}
            >
              <span>Sign Up</span>
            </LoadingButton>
          </div>
        </FormProvider>
        {/* Form Ends */}

        <div className='option'>
          Already have an account?{' '}
          <Link href={paths.auth.user.login}>Login</Link>
        </div>
        <div className='or d-none'>
          <span>Or</span>
        </div>
        <ul className='social-icons d-none'>
          <li>
            <a href='#0'>
              <i className='fab fa-facebook-f'></i>
            </a>
          </li>
          <li>
            <a href='#0' className='active'>
              <i className='fab fa-twitter'></i>
            </a>
          </li>
          <li>
            <a href='#0'>
              <i className='fab fa-google'></i>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default UserRegisterView;
