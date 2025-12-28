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
// {
//   "success": true,
//   "message": "OTP sent successfully",
//   "messageAr": "تم إرسال رمز التحقق",
//   "token": null,
//   "expiresAt": null,
//   "user": null,
//   "otpCode": "4722"
// }
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
