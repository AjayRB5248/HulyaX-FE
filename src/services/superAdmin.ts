import axiosInstance, { endpoints } from 'src/utils/axios';

const superAdminService = {
  approveCompany: (userId: string, isApproved: string) =>
    axiosInstance.post(endpoints.superAdmin.company.approveCompany, {
      userId,
      isApproved,
    }),
  veiwAssignedEvents:(subEventId?:any)=>
  axiosInstance.post(endpoints.superAdmin.company.veiwAssignedEvents,{subEventId}),
  state: () => axiosInstance.get(endpoints.superAdmin.states.list),
  assignCompanyFromEvent: (data: any) =>
    axiosInstance.post(endpoints.superAdmin.company.assignCompanyFromEvent, {
      ...data,
    }),
  removeCompanyFromEvent: (data: any) =>
    axiosInstance.delete(endpoints.superAdmin.company.removeCompanyFromEvent, {
      data,
    }),
  setupTicket: (data: any) =>
    axiosInstance.post(endpoints.superAdmin.ticket.setupTicket,  data ),
  updateTicket: (data: any) =>
    axiosInstance.post(endpoints.superAdmin.ticket.updateTicket,  data ),
};

export default superAdminService;
