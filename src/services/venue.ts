import axiosInstance, { endpoints } from "src/utils/axios";

const VenueService = {
  createVenue: (formData:any) =>
    axiosInstance.post(endpoints.superAdmin.venue.createVenue, formData),
  updateVenue:(id: string,formData:any) =>
    axiosInstance.put(endpoints.superAdmin.venue.updateVenue(id), formData),
  list: (state?:string) =>
    axiosInstance.post(endpoints.superAdmin.venue.list,{state}),
  removeVenue:(id: string) =>
    axiosInstance.delete(endpoints.superAdmin.venue.removeVenue(id)),
};

export default VenueService;