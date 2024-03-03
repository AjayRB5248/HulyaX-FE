import * as Yup from "yup";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
// hooks
import { useMockedUser } from "src/hooks/use-mocked-user";
// utils
import { fData } from "src/utils/format-number";
// assets
import { countries } from "src/assets/data";
// components
import Iconify from "src/components/iconify";
import { useSnackbar } from "src/components/snackbar";
import FormProvider, { RHFSwitch, RHFTextField, RHFUploadAvatar, RHFAutocomplete } from "src/components/hook-form";
import { getUserData } from "src/utils/token-management";
import { Chip } from "@mui/material";
import Link from "next/link";
import { useUpdateUserProfile } from "src/api/user";

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const updateProfileMutation = useUpdateUserProfile();

  const userData = getUserData();
  const user = JSON.parse(userData);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    profilePicture: Yup.mixed<any>().nullable().required("Avatar is required"),
    mobileNumber: Yup.string().required("Phone number is required"),
  });

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    profilePicture: user?.profilePicture || null,
    mobileNumber: user?.mobileNumber || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info("DATA", data);

      // TODO: Update Profile Mutation
      await updateProfileMutation.mutateAsync(data);
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
        setValue("profilePicture", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit} className="user-profile--form">
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: "center" }}>
            <RHFUploadAvatar
              name="profilePicture"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="h4"
                  sx={{
                    mt: 3,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  {user.name}
                </Typography>
              }
            />

            <Button variant="soft" color="success" sx={{ mt: 3, width: "max-content", height: "auto" }}>
              {user.isNumberVerified ? (
                <span>
                  Hulya Verified User <i className="fa fa-check-circle ml-2"></i>{" "}
                </span>
              ) : (
                "Hulya User"
              )}
            </Button>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="name" label="Name" required />
              <RHFTextField name="email" label="Email Address" required />
              <RHFTextField name="mobileNumber" label="Phone Number" required />

              {/* TODO: Implement Verify phone Number Link */}
              {user.isNumberVerified ? (
                <span className="text-success text-verified">
                  Phone Number Verified <i className="fa fa-check-circle ml-2"></i>{" "}
                </span>
              ) : (
                <Link className="text-warning verify-phone-link" href="/">
                  Verify Your Phone Number <i className="fa fa-warning ml-2"></i>{" "}
                </Link>
              )}
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              {/* <RHFTextField name="about" multiline rows={4} label="About" /> */}

              <LoadingButton type="submit" variant="contained" loading={isSubmitting} className="btn-save">
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
