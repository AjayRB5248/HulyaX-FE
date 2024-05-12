import axiosInstance, { endpoints } from "src/utils/axios";

const superAdminService = {
  approveCompany: ( userId: string, isApproved: string) =>
    axiosInstance.post(endpoints.superAdmin.approveCompany, { userId, isApproved }),
  
};

export default superAdminService;
