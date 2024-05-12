import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useRouter } from "src/routes/hook";
import superAdminService from "src/services/superAdmin";

export function useApproveCompany() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation(
    ["approveCompany"],
    async (data: any) => {
      const response = await superAdminService.approveCompany(data.userId, data.isApproved);
      return response?.data;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || "Error approving company", {
          variant: "error",
        });
      },
      onSuccess: () => {
        enqueueSnackbar("Company Updated Successfully!", { variant: "success" });
          queryClient.invalidateQueries(['users']);
      },
    }
  );
}


