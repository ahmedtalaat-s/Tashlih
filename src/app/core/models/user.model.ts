export type UserType = 'customer' | 'supplier';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  avatarUrl: string | null;
  userType: 'customer' | 'supplier' | 'admin' | string;
  status: 'active' | 'inactive' | 'blocked' | string;
  isVerified: boolean;
  verificationStatus: string | null;
  rejectionReason: string | null;
  preferredLanguage: 'ar' | 'en' | string;
  notificationsEnabled: boolean;
  createdAt: string; // ISO Date string
}
