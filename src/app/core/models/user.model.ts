export type UserType = 'customer' | 'supplier';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  userType: UserType;
  status: UserStatus;
  isVerified: boolean | null;
  verificationStatus: string | null;
  businessName: string | null;
}
