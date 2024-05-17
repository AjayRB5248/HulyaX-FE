import axiosInstance, { endpoints } from 'src/utils/axios';

const superAdminService = {
  approveCompany: (userId: string, isApproved: string) =>
    axiosInstance.post(endpoints.superAdmin.company.approveCompany, {
      userId,
      isApproved,
    }),
  state: () => axiosInstance.get(endpoints.superAdmin.states.list),
};

export default superAdminService;
