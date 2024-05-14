import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { useRouter } from "src/routes/hook";
import ArtistService from "src/services/artists";

export function useCreateArtistProfile() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["craeteArtistProfile"],
    async (data: any) => {
      const response = await ArtistService.createArtist(data);
      return response?.data?.user;
    },
    {
      onError: (error: any) => {
        enqueueSnackbar(error.response.data.message || "Error creating artist profile", {
          variant: "error",
        });
      },
      onSuccess: (ticket) => {
        enqueueSnackbar("Artist Updated Successfully!", { variant: "success" });
        if (ticket) {
          router.push(ticket);
        }
      },
    }
  );
}

export function useArtists(queryParameters?: any) {
  const { data, isLoading, error, refetch } = useQuery(
    ['artists'],
    async () => {
      const res = await ArtistService.list(queryParameters);
      return res?.data;
    },
    {
      keepPreviousData: true,
    }
  );

  const artists = useMemo(() => data || [], [data]);

  return {
    artists,
    loading: isLoading,
    error,
    refetch,
  };
}

export function useUpdateUserAvatar() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["updateUserAvatar"],
    async ({id,data}:{id:string,data:any}) => {
      const response = await ArtistService.updateArtist(id,data);
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
