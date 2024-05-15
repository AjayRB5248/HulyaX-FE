import axiosInstance, { endpoints } from "src/utils/axios";

const ArtistService = {
  createArtist: (data:any) =>
    axiosInstance.post(endpoints.superAdmin.artist.createArtist, data),
  updateArtist:(id: string,data:any) =>
    axiosInstance.put(endpoints.superAdmin.artist.updateArtist(id), data),
  list: () =>
    axiosInstance.post(endpoints.superAdmin.artist.list),
  removeArtist:(id: string) =>
    axiosInstance.delete(endpoints.superAdmin.artist.removeArtist(id)),
};

export default ArtistService;