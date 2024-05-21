import axiosInstance, { endpoints } from 'src/utils/axios';

const DashboardService = {
  dashboardReport: (queryParameters = {}) =>
    axiosInstance.get(endpoints.dashboard.report(queryParameters)),
};

export default DashboardService;
