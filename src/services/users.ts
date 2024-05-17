import axiosInstance, { endpoints } from 'src/utils/axios';

const UsersService = {
  list: (queryParameters = {}) =>
    axiosInstance.get(endpoints.users.list(queryParameters)),
  create: (data: any) => axiosInstance.post(endpoints.events.create, data),
  update: (userId: string, data: any) =>
    axiosInstance.patch(endpoints.users.update(userId), data),
  details: (id: any) => axiosInstance.get(endpoints.events.details(id)),
  remove: (id: string) => axiosInstance.delete(endpoints.users.remove(id)),
  alUserByRole: (role: string) =>
    axiosInstance.get(endpoints.users.listByRole(role)),
};

export default UsersService;
