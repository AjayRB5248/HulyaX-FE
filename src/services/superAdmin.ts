import axiosInstance, { endpoints } from "src/utils/axios";

const superAdminService = {
  approveCompany: ( userId: string, isApproved: string) =>
    axiosInstance.post(endpoints.superAdmin.company.approveCompany, { userId, isApproved }),
  state: () =>
    axiosInstance.get(endpoints.superAdmin.state.list),
  assignCompanyFromEvent:(data:any)=>
    axiosInstance.post(endpoints.superAdmin.company.assignCompanyFromEvent, { data }),
  removeCompanyFromEvent:(data:any)=>
    axiosInstance.delete(endpoints.superAdmin.company.removeCompanyFromEvent, { data }),
};

export default superAdminService;
