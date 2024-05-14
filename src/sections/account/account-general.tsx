import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
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
import { useSnackbar } from "src/components/snackbar";
import FormProvider, { RHFTextField, RHFUploadAvatar } from "src/components/hook-form";
import { getUserData } from "src/utils/token-management";
import Link from "next/link";
import { useUpdateUserAvatar, useUpdateUserProfile } from "src/api/user";
import VerifyOTPModal from "./otp-verify-modal";
import { useBoolean } from "src/hooks/use-boolean";
import { sendOTP, verifyOTP } from "src/api/auth";
import { useRouter } from "src/routes/hook/use-router";

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const userData = getUserData();
  const user = JSON.parse(userData);
  const verifyMobile = useBoolean()
  const updateProfileMutation = useUpdateUserProfile(user?.id);
  const updateAvatarMutation = useUpdateUserAvatar();
  const sendOTPMutation = sendOTP();
  const verifyOTPMutation = verifyOTP();
  const router = useRouter();
  const [loading,setLoading] = useState(false)

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    profilePicture: Yup.mixed().nullable(),
    // mobileNumber: Yup.string().required("Phone number is required"),
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
    formState: { errors },
    watch
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateProfileMutation.mutateAsync({email: data?.email, name: data?.name});
    } catch (error) {
      console.error(error);
    }
  });

  const sendOTPCode= async (tokenType:string) => {
    if (user) {
      const payload = {
        email: user.email,
        tokenType: tokenType,
      };
      return await sendOTPMutation.mutateAsync(payload);
    }
    return null;
  };

  const handleOtpVerifyModal = async () => {
    setLoading(true);
    try {
      const generatedOTPRes = await sendOTPCode("OTP_MOBILE");
      if (generatedOTPRes) {
        verifyMobile.onTrue();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMobileNumber = async (data:any)=>{
    try {
      let verifiedOTPRes;
      if (user) {
        const payloadForGeneratingOTP = {
          email: user?.email,
          otp: data?.otp,
        };
        verifiedOTPRes = await verifyOTPMutation.mutateAsync(payloadForGeneratingOTP);
      }
      if(verifiedOTPRes){
        verifyMobile.onFalse()
      }
    } catch (error) {
      console.error(error);
    }
  }

  const generateOTPCode = async () => {
    setLoading(true);
    try {
      const generatedOTPRes = await sendOTPCode("OTP_MOBILE");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const watchedFields= watch();

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

  const onSubmitAvatar = async (data:{profilePicture:string}) => {
    try {
      const formData = new FormData();
      formData.append('profile-picture', data.profilePicture);
      await updateAvatarMutation.mutateAsync(formData);
      enqueueSnackbar("Profile picture updated successfully", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to update profile picture", { variant: "error" });
    }
  };

  useEffect(() => {
    if (watchedFields?.profilePicture && watchedFields?.profilePicture !== user?.profilePicture) {
      handleSubmit(() => onSubmitAvatar({profilePicture: watchedFields.profilePicture}))();
    }
  }, [watchedFields?.profilePicture, handleSubmit, user?.profilePicture]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit} className="user-profile--form">
        <VerifyOTPModal
          open={verifyMobile.value}
          onClose={verifyMobile.onFalse}
          onOk={handleVerifyMobileNumber}
          generateOTPCode={generateOTPCode}
        />
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
                  {user?.name}
                </Typography>
              }
            />
            <Button variant="soft" color="success" sx={{ mt: 3, width: "max-content", height: "auto" }}>
              {user?.isNumberVerified ? (
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
              <RHFTextField name="mobileNumber" label="Phone Number" disabled/>

              {user?.isNumberVerified ? (
                <span className="text-success text-verified">
                  Phone Number Verified <i className="fa fa-check-circle ml-2"></i>{" "}
                </span>
              ) : (
                <Button className="text-warning verify-phone-link" onClick={handleOtpVerifyModal} disabled={loading}>
                  Verify Your Phone Number <i className="fa fa-warning ml-2"></i>{" "}
                </Button>
              )}
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>

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
