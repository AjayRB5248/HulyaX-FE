import axiosInstance, { endpoints } from "src/utils/axios";

const ArtistService = {
  createArtist: (data:any) =>
    axiosInstance.patch(endpoints.artist.createArtist, {data}),
  updateArtist:(id: string,data:any) =>
    axiosInstance.post(endpoints.artist.updateArtist(id), {data}),
  list: (queryParameters = {}) =>
    axiosInstance.get(endpoints.artist.list(queryParameters)),
};

export default ArtistService;