import axiosInstance, { endpoints } from 'src/utils/axios';

const StatesService = {
  list: () => axiosInstance.post(endpoints.superAdmin.states.list),
};

export default StatesService;
