import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { useAuth } from "src/auth/context/users/auth-context";
import { useRouter } from "src/routes/hook";
import UserService from "src/services/user";

export function useUpdateUserProfile(id: string) {
  const { setUser } = useAuth();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["updateUserProfile"],
    async (data: any) => {
      const response = await UserService.updateProfile(id, data.name, data.email);
      setUser(response?.data);
      return response?.data;
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

export function useChangePassword() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["changePassword"],
    async (data: any) => {
      const response = await UserService.changePassword(data.password, data.newPassword, data.confirmPassword);
      return response?.data?.user;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || "Error updating profile", {
          variant: "error",
        });
      },
      onSuccess: () => {
        enqueueSnackbar("Password Changed Successfully!", { variant: "success" });
      },
    }
  );
}

export const useFetchUserById = (id: string) => {
  const { setUser } = useAuth();

  const { data, error, isLoading, refetch } = useQuery(
    ["users/id", id],
    async () => {
      const response = await UserService.fetchUserById(id);
      setUser(response?.data);
      return response?.data;
    },
    {
      enabled: !!id,
    }
  );

  return {
    userDetail: data,
    error,
    isLoading,
    refetchUser: refetch,
  };
};
