import { User } from './user.model';

export interface getUserResponse {
  success: boolean;
  user: User;
}

//customer registration interfaces

export interface registerCustomerRequest {
  fullName: string;
  phone: string;
  password: string;
  email?: string;
  preferredLanguage?: string;
}

export interface registerCustomerResponse {
  success: boolean;
  message: string;
  messageAr: string;
  token: string | null;
  expiresAt: string | null;
  user: User | null;
  otpCode?: string;
}

//otp

export interface sendOtpResponse {
  success: boolean;
  message: string;
  messageAr: string;
  token: string | null;
  expiresAt: string | null;
  user: User | null;
  otpCode?: string;
}

//verify otp
export interface verifyOtpResponse extends sendOtpResponse {}

// supplier registration interfaces
export interface SupplierRegisterRequest {
  fullName: string;
  phone: string;
  email?: string;
  password: string;

  businessNameAr: string;
  businessNameEn?: string;
  businessType: string;

  city: string;
  district?: string;

  commercialRegisterNumber: string;

  commercialRegisterImage: File;
  identityImage: File;
  logo?: File;

  latitude?: number;
  longitude?: number;

  preferredLanguage?: string;
}
export interface SupplierRegisterResponse {
  success: boolean;
  message: string;
  messageAr: string;
  token: string | null;
  expiresAt: string | null;
  user: User | null;
  otpCode?: string;
}

// login with password
export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  messageAr: string;
  token: string | null;
  expiresAt: string | null;
  user: User | null;
}

// login with otp
export interface LoginOtpRequest {
  phone: string;
  otpCode: string;
}

export interface LoginOtpResponse {
  success: boolean;
  message: string;
  messageAr: string;
  token: string | null;
  expiresAt: string | null;
  user: User | null;
}
