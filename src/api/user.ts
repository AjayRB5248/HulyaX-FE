import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useRouter } from "src/routes/hook";
import UserService from "src/services/user";

export function useUpdateUserProfile(id:string) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["updateUserProfile"],
    async (data: any) => {
      const response = await UserService.updateProfile(id,data.name, data.email);

      //   TODO: Map Edit User Profile
      return response?.data?.user;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || "Error updating profile", {
          variant: "error",
        });
      },
      onSuccess: (ticket) => {
        enqueueSnackbar("Profile Updated Successfully!", { variant: "success" });
        if (ticket) {
          router.push(ticket);
        }
      },
    }
  );
}

export function useUpdateUserAvatar() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["updateUserAvatar"],
    async (formData: any) => {
      const response = await UserService.updateAvatar(formData);
      return response?.data?.user;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || "Error updating profile", {
          variant: "error",
        });
      },
      onSuccess: () => {
        enqueueSnackbar("Profile Picture Updated Successfully!", { variant: "success" });
      },
    }
  );
}
