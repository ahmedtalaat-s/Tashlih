import { environment } from '../environment/environment';

export const API_CONSTANTS = {
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
    LOOKUPS: {
      CATEGORIES: 'Lookups/part-categories',
      YEARS: 'Lookups/years',
      CITIES: 'Lookups/cities',
      PART_CONDITIONS: 'Lookups/part-conditions',
      WARRANTY_TYPES: 'Lookups/warranty-types',
      VEHICLE_TYPES: 'Lookups/vehicle-types',
      SUBCATEGORIES: 'Lookups/subcategories',
      VEHICLE_TYPE_SUBCATEGORIES: (vehicleTypeId: number | string) =>
        `Lookups/vehicle-types/${vehicleTypeId}/subcategories`,

      MAKES: 'Lookups/makes',

      VEHICLE_TYPE_MAKES: (vehicleTypeId: number | string) =>
        `Lookups/vehicle-types/${vehicleTypeId}/makes`,

      MODELS: 'Lookups/models',

      MAKE_MODELS: (makeId: number | string) => `Lookups/makes/${makeId}/models`,
    },
    SUPPLIERS: {
      GET_BY_ID: (id: number | string) => `Suppliers/${id}`,

      LIST: 'Suppliers/list',
      NEARBY: 'Suppliers/nearby',
      MY_STATISTICS: 'Suppliers/my-statistics',
      DASHBOARD: 'Suppliers/dashboard',
      SEARCH: 'Suppliers/search',
    },
    FAVORITES: {
      PARTS: {
        ADD: (partId: number | string) => `Favorites/parts/${partId}`,
        REMOVE: (partId: number | string) => `Favorites/parts/${partId}`,
        LIST: 'Favorites/parts',
        CHECK: (partId: number | string) => `Favorites/parts/${partId}/check`,
      },

      SUPPLIERS: {
        ADD: (supplierId: number | string) => `Favorites/suppliers/${supplierId}`,
        REMOVE: (supplierId: number | string) => `Favorites/suppliers/${supplierId}`,
        LIST: 'Favorites/suppliers',
        CHECK: (supplierId: number | string) => `Favorites/suppliers/${supplierId}/check`,
      },
    },
    CUSTOMER_ORDERS: {
      CREATE: 'CustomerOrders',
      MY_ORDERS: 'CustomerOrders/my-orders',
      DETAILS: (id: number | string) => `CustomerOrders/${id}`,
      COMPLETE: (id: number | string) => `CustomerOrders/${id}/complete`,
      CANCEL: (id: number | string) => `CustomerOrders/${id}/cancel`,
    },
    CUSTOMER_PROFILE: {
      ME: 'CustomerProfile/me',
      UPDATE_PROFILE: 'CustomerProfile/Update-Profile',
      UPLOAD_PROFILE_IMAGE: 'CustomerProfile/Upload-Profile-Image',
      DELETE_PROFILE_IMAGE: 'CustomerProfile/Delete-Profile-Image',
      UPDATE_LOCATION: 'CustomerProfile/Update-Location',
      CITIES: 'CustomerProfile/Cities',
    },
    ADMIN: {
      LOGIN: 'Admin/login',
      PROFILE: 'Admin/profile',
      PLANS: 'Admin/plans',
      GET_SUBSCRIPTIONS: 'Admin/subscriptions',
      VEHICLE_TYPES: 'Admin/lookups/vehicle-types',
      MAKES: 'Admin/lookups/makes',
      MODELS: 'Admin/lookups/models',
      CATEGORIES: 'Admin/lookups/categories',
      SUBCATEGORIES: 'Admin/lookups/subcategories',
      CITIES: 'Admin/lookups/cities',
      PART_CONDITIONS: 'Admin/lookups/part-conditions',
      WARRANTY_TYPES: 'Admin/lookups/warranty-types',
      YEARS: 'Admin/lookups/years',
      GET_ALL: `Admin/suppliers`,
      GET_BY_ID: (id: number | string) => `Admin/suppliers/${id}`,
      DELETE: (id: number | string) => `Admin/suppliers/${id}`,
      VERIFY: (id: number | string) => `Admin/suppliers/${id}/verify`,
      ACTIVATE: (id: number | string) => `Admin/suppliers/${id}/activate`,
      DEACTIVATE: (id: number | string) => `Admin/suppliers/${id}/deactivate`,

      GET_ALL_CUSTOMERS: `Admin/customers`,
      GET_CUSTOMER_BY_ID: (id: number) => `Admin/customers/${id}`,
      DELETE_CUSTOMER: (id: number) => `Admin/customers/${id}`,
      ACTIVATE_CUSTOMER: (id: number) => `Admin/customers/${id}/activate`,
      DEACTIVATE_CUSTOMER: (id: number) => `Admin/customers/${id}/deactivate`,
    },
    CHAT: {
      START: 'Chat/start',
      MY_THREADS: 'Chat/my-threads',
      MESSAGES: (threadId: number) => `Chat/${threadId}/messages`,
      SEND: (threadId: number) => `Chat/${threadId}/send`,
      READ: (threadId: number) => `Chat/${threadId}/read`,
      DELETE: (threadId: number) => `Chat/${threadId}`,
    },
  },
};
