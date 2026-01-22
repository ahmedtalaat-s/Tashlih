import { environment } from '../environment/environment';
import { Login } from '../features/auth/login/login';

export const API_CONSTSANTS = {
  BASE_URL: environment.API_URL,
  END_POINTS: {
    AUTH: {
      REGISTER_CUSTOMER: 'Auth/register/customer',
      REGISTER_SUPPLIER: 'Auth/register/supplier',
      LOGIN: 'Auth/login',

      // OTP
      SEND_OTP: 'Auth/send-otp',
      VERIFY_OTP: 'Auth/verify-otp',

      //Login
      Login: 'Auth/login',
      LOGIN_OTP: 'Auth/login-otp',

      // Password
      CHANGE_PASSWORD: 'Auth/change-password',
      RESET_PASSWORD: 'Auth/reset-password',

      // Logout
      LOGOUT: 'Auth/logout',
      LOGOUT_ALL: 'Auth/logout-all',

      // User info
      ME: 'Auth/me',

      // Checks
      CHECK_PHONE: (phone: string) => `Auth/check-phone/${phone}`,
      CHECK_EMAIL: (email: string) => `Auth/check-email/${email}`,
    },
    PARTS: {
      // CRUD
      CREATE: 'Parts',
      GET_ALL: 'Parts',
      GET_BY_ID: (id: string | number) => `Parts/${id}`,
      UPDATE: (id: string | number) => `Parts/${id}`,
      DELETE: (id: string | number) => `Parts/${id}`,

      // Supplier parts
      MY_PARTS: 'Parts/my-parts',

      // Images
      ADD_IMAGE: (id: string | number) => `Parts/${id}/images`,
      SET_PRIMARY_IMAGE: (partId: string | number, imageId: string | number) =>
        `Parts/${partId}/images/${imageId}/primary`,

      // Filters & listings
      SEARCH: 'Parts/search',
      BY_CATEGORY: (categoryId: string | number) => `Parts/category/${categoryId}`,
      BY_SUPPLIER: (supplierId: string | number) => `Parts/supplier/${supplierId}`,
      FEATURED: 'Parts/featured',
      LATEST: 'Parts/latest',
    },
  },
};
