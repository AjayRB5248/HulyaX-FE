import axiosInstance, { endpoints } from 'src/utils/axios';

const EventsService = {
  list: () =>
    axiosInstance.get(endpoints.events.list),
  create: (data: any) => axiosInstance.post(endpoints.events.create, data),
  update: (id: string, data: any) =>
    axiosInstance.put(endpoints.events.update(id), data),
  details: (id: any) => axiosInstance.get(endpoints.events.details(id)),
  remove: (id: string) => axiosInstance.delete(endpoints.events.remove(id)),
  removeItem: (id: string, data: any) =>
    axiosInstance.delete(endpoints.events.removeItem(id), { data }),
  addItem: (id: string, data: any) =>
    axiosInstance.post(endpoints.events.addItem(id), data),
  fetchSingleEventBySlug: (slug: string) => axiosInstance.get(endpoints.events.detailsBySlug(slug)),
  fetchAllEvents: () => axiosInstance.get(endpoints.events.allEvents()),
};

export default EventsService;
