import axiosInstance, { endpoints } from "src/utils/axios";

const UserService = {
  updateProfile: (id:string, name: string, email: string) =>
    axiosInstance.patch(endpoints.user.updateProfile(id), { name, email }),
  updateAvatar:(formData: string) =>
    axiosInstance.post(endpoints.user.updateAvatar, formData),
};

export default UserService;
