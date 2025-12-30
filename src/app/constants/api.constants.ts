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
  },
};
