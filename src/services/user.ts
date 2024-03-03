import axiosInstance, { endpoints } from "src/utils/axios";

const UserService = {
  updateProfile: (name: string, email: string, profilePicture: string, mobileNumber: string) =>
    axiosInstance.post(endpoints.user.updateProfile, { name, email, profilePicture, mobileNumber }),
};

export default UserService;
