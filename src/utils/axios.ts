import axios from 'axios';
import { BASE_URL } from 'src/config-global';
import { getAccessToken, useRefreshToken } from './token-management';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // 'Authorization': `Bearer ${accessToken}`,
    'Content-Type': undefined,
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
    } catch (error) {
      console.error('Error handling token expiry:', error);
      throw error;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (error.response.message === 'Expired/Invalid Token') {
        // message needs to change later
        try {
          const token = await useRefreshToken();
          if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          throw refreshError;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    sendOTP: '/auth/generate-otp',
    verifyOTP: '/auth/verify-otp',
    refreshToken: '/auth/refresh-tokens',
    sendEmailVerification: 'auth/send-verification-email',
    forgotPassword: 'auth/forgot-password',
    resetPassword: 'auth/reset-password',
    logout: '/auth/logout',
  },
  dashboard:{
    report:(queryParameters = {}) => {
      let url = '/dashboard/get-dashboard-report';
      const params = new URLSearchParams(queryParameters).toString();
      if (params) {
        url += `?${params}`;
      }
      return url;
    },
  },
  faqs:{
    create:`faq`
  },
  events: {
    list: 'events/fetch-events',
    create: '/superadmin/add-new-event',
    update: (id: string) => `superadmin/events/edit/${id}`,
    details: (id: any) => `/events/${id}`,
    remove: (id: string) => `superadmin/events/${id}`,
    removeItem: (id: string) => `/events/edit/remove-event-items/${id}`,
    addItem: (id: string) => `/events/edit/add-event-items/${id}`,
    detailsBySlug: (slug: string) => `/events/slug/${slug}`,
    allEvents: () => `events/fetch-subEvent-by-parent-event/all`,
  },
  users: {
    list: (queryParameters = {}) => {
      let url = '/superadmin/fetch-all-users';
      const params = new URLSearchParams(queryParameters).toString();
      if (params) {
        url += `?${params}`;
      }
      return url;
    },
    remove: (id: string) => `/users/${id}`,
    update: (userId: string) => `/users/${userId}`,
    listByRole: (role: string) => `/superadmin/fetch-all-users?role=${role}`,
  },
  tickets: {
    list: `tickets/view-tickets`,
    purchase: `tickets/purchase-ticket`,
  },
  user: {
    updateProfile: (id: string) => `users/${id}`,
    updateAvatar: `users/profile-picture`,
    changePassword: `users/update-password`,
    detailById: (id: string) =>  `/users/${id}`,
  },
  superAdmin: {
    company: {
      approveCompany: '/superadmin/approve-company',
      assignCompanyFromEvent: '/superadmin/assign-companies-to-events',
      removeCompanyFromEvent: '/superadmin/assign-companies-to-events',
      veiwAssignedEvents:'events/view-assigned-events'
    },
    artist: {
      createArtist: `/superadmin/artists/add-artist`,
      updateArtist: (id: string) => `superadmin/artists/${id}`,
      removeArtist: (id: string) => `superadmin/artists/${id}`,
      list: `/superadmin/artists/fetch-artist`,
    },
    venue: {
      list: `superadmin/list-venue`,
      createVenue: `superadmin/venues/add-venues`,
      updateVenue: (id: string) => `superadmin/venues/${id}`,
      removeVenue: (id: string) => `superadmin/venues/${id}`,
    },
    states: {
      list: '/superadmin/states/list',
    },
    ticket: {
      setupTicket: `superadmin/add-ticket`,
      updateTicket: `superadmin/update-ticket`,
      removeTicket: (id: string) => `superadmin/tickets/${id}`,
    },
    customer:{
      list: `superadmin/get-customer-by-event`,
    }
  },
};
