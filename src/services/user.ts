import axiosInstance, { endpoints } from "src/utils/axios";

const UserService = {
  updateProfile: (id: string, name: string, email: string) =>
    axiosInstance.patch(endpoints.user.updateProfile(id), { name, email }),
  updateAvatar: (formData: string) => axiosInstance.post(endpoints.user.updateAvatar, formData),
  changePassword: (password: string, newPassword: string, confirmPassword: string) =>
    axiosInstance.post(endpoints.user.changePassword, { password, newPassword, confirmPassword }),
  fetchUserById: (id: string) => axiosInstance.get(endpoints.user.detailById(id)),
};

export default UserService;
