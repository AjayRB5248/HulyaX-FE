"use client";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// routes
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";
import { useSearchParams, useRouter } from "src/routes/hook";
// config
import { PATH_AFTER_LOGIN } from "src/config-global";
// auth
import { useAuthContext } from "src/auth/hooks";
// components
import Iconify from "src/components/iconify";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { useRegister } from "src/api/auth";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "src/auth/context/users/auth-context";

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const {user} = useAuth();

  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const password = useBoolean();

  const registerMutation = useRegister();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("User Full Name required"),
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    mobileNumber: Yup.string().required("Mobile Number is required"),
  });

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    confirmPassword: "",
  };

  useEffect(() => {
    if (user && !(user.role==='customer') && user?.isApproved) {
      router.push(paths.dashboard.root);
    }
  }, [user]);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const handlePhoneChange = (value:any) => {
    if (!value.startsWith("+")) {
      value = "+" + value;
    }
    methods.setValue("mobileNumber", value);
  };

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const registerPayload = {
        name: data?.name,
        email: data?.email,
        password: data?.password,
        mobileNumber: data?.mobileNumber,
        role: "companyAdmin"
      };

      await registerMutation.mutateAsync(registerPayload);
      router.push("/auth/company/verify");
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === "string" ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Typography variant="h4">Get started </Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.company.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography component="div" sx={{ color: "text.secondary", mt: 2.5, typography: "caption", textAlign: "center" }}>
      {"By signing up, I agree to "}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {" and "}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField InputLabelProps={{ shrink: true }} name="name" label="Company Name" />

        <RHFTextField InputLabelProps={{ shrink: true }} name="email" label="Email address" />

        <PhoneInput
          country={"au"}
          onlyCountries={["au", "np"]}
          inputStyle={{
            width: "100%",
            borderRadius: "4px",
            fontSize: "16px",
          }}
          buttonStyle={{
            borderRadius: "4px 0 0 4px",
            border: "1px solid #ced4da",
            backgroundColor: "#e9ecef",
          }}
          containerStyle={{ marginBottom: "16px" }}
          dropdownStyle={{ borderRadius: "4px", border: "1px solid #ced4da" }}
          onChange={handlePhoneChange}
        />

        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? "text" : "password"}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm New Password"
          type={password.value ? "text" : "password"}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth color="inherit" size="large" type="submit" variant="contained" loading={isSubmitting}>
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      {renderTerms}
    </>
  );
}
