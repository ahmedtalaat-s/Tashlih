// address
export interface UserAddress {
  street: string | null;
  cityId: number | null;
  cityNameAr: string | null;
  cityNameEn: string | null;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface CustomerProfileResponse {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  avatarUrl: string | null;
  preferredLanguage: string;
  notificationsEnabled: boolean;
  address: UserAddress;
  createdAt: string;
  isPhoneVerified: boolean;
}

//update profile request
export interface UpdateCustomerProfileRequest {
  fullName: string;
  email: string;
  preferredLanguage: string;
  notificationsEnabled: boolean;
  street: string;
  cityId: number;
  postalCode: string;
  latitude?: number;
  longitude?: number;
}
