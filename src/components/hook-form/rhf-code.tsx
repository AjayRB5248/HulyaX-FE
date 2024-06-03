import { Controller, useFormContext } from "react-hook-form";
import { MuiOtpInput, MuiOtpInputProps } from "mui-one-time-password-input";
// @mui
import FormHelperText from "@mui/material/FormHelperText";
import { useEffect, useRef } from "react";

// ----------------------------------------------------------------------

type RHFCodesProps = MuiOtpInputProps & {
  name: string;
  onComplete: (value: string) => void;
};

export default function RHFCode({ name, onComplete, ...other }: RHFCodesProps) {
  const { control, watch } = useFormContext();

  const otpValue = watch(name);
  const hasCalledOnComplete = useRef(false);

  useEffect(() => {
    if (otpValue?.length === 8 && !hasCalledOnComplete.current) {
      hasCalledOnComplete.current = true;
      onComplete(otpValue);
    }
  }, [otpValue, onComplete]);

  useEffect(() => {
    hasCalledOnComplete.current = false;
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <MuiOtpInput
            {...field}
            autoFocus
            gap={1.5}
            length={8}
            TextFieldsProps={{
              error: !!error,
              placeholder: "-",
              inputProps: {
                inputMode: "numeric",
                pattern: "[0-9]*",
              },
            }}
            {...other}
          />

          {error && (
            <FormHelperText sx={{ px: 2 }} error>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}
