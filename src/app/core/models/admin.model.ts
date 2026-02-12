//admin login models
export interface Admin {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
  lastLoginAt: string; // Or Date if you plan to parse it immediately
  createdAt: string; // Or Date
}

export interface adminLoginResponse {
  success: boolean;
  message: string;
  messageAr: string;
  token: string;
  admin: Admin;
}

// plans for admin
// get plans response
export interface PlansResponse {
  success: boolean;
  plans: Plan[];
  totalCount: number;
}

export interface Plan {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string | null;
  logoUrl: string | null;
  price: number;
  currency: string;
  durationDays: number;
  maxParts: number;
  maxImagesPerPart: number;
  maxShops: number;
  features: string[] | null;
  isPopular: boolean;
  badgeText: string | null;
}
// create or update a file
export interface PlanRequest {
  NameAr: string;
  NameEn?: string;

  DescriptionAr?: string;
  DescriptionEn?: string;

  Price: number;
  Currency: string;
  DurationDays: number;

  MaxParts?: number;
  MaxImagesPerPart: number;
  MaxShops: number;

  IsActive: boolean;
  IsPopular?: boolean;

  BadgeText?: string;
  SortOrder: number;

  logo?: File;
}
