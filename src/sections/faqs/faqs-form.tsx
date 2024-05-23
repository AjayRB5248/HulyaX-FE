import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { m } from 'framer-motion';
import { Stack, Button, TextField, Typography } from '@mui/material';
import { varFade, MotionViewport } from 'src/components/animate';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useCreateFAQ } from 'src/api/faqs';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  const createFAQmutations = useCreateFAQ();

  const FaqsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(FaqsSchema),
    defaultValues,
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = methods;

  const onSubmit = async (data:any) => {
    try {
      await createFAQmutations.mutateAsync(data);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack component={MotionViewport} spacing={3}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h4" color={'black'}>{`Haven't found the right help?`}</Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField name="name" label="Name" fullWidth />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField name="email" label="Email" fullWidth />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField name="subject" label="Subject" fullWidth />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField name="message" label="Enter your message here." multiline rows={4} fullWidth />
        </m.div>

        <m.div variants={varFade().inUp}>
          <Button type="submit" size="large" variant="contained" disabled={isSubmitting}>
            Submit Now
          </Button>
        </m.div>
      </Stack>
    </FormProvider>
  );
}
