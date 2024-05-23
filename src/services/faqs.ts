import axiosInstance, { endpoints } from "src/utils/axios";

const FAQService = {
  createFAQ: (data:any) =>
    axiosInstance.post(endpoints.faqs.create, data),
};

export default FAQService;