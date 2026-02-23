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

//supplier models
export interface VerifySupplierRequest {
  supplierId: number;
  isApproved: boolean;
  rejectionReason?: string;
  adminNotes?: string;
  requiredDocuments?: string[];
}

export interface GetSuppliersParams {
  Page?: number;
  PageSize?: number;
  Search?: string;
  Status?: string;
  VerificationStatus?: string;
  City?: string;
}

export interface ApiResponseBase {
  success: boolean;
  message: string | null;
  messageAr: string | null;
}

export interface SupplierListItem {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  businessNameAr: string | null;
  businessNameEn: string | null;
  city: string;
  logoUrl: string | null;
  isVerified: boolean;
  verificationStatus: string;
  status: string;
  ratingAverage: number;
  totalOrders: number;
  partsCount: number;
  currentPlan: string | null;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems?: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface GetSuppliersResponse extends ApiResponseBase {
  suppliers: SupplierListItem[];
  totalCount: number;
  pagination: PaginationInfo;
}

export interface SupplierDetails extends SupplierListItem {
  managerName: string | null;
  description: string | null;
  businessType: string | null;
  district: string | null;

  idFrontUrl: string | null;
  idBackUrl: string | null;
  idNumber: string | null;

  commercialRegisterImageUrl: string | null;
  commercialRegister: string | null;
  commercialRegisterExpiryDate: string | null;

  licenseImageUrl: string | null;
  licenseNumber: string | null;
  licenseExpiryDate: string | null;

  taxCertificateUrl: string | null;
  taxNumber: string | null;

  rejectionReason: string | null;
  adminNotes: string | null;

  verificationSubmittedAt: string | null;
  verifiedAt: string | null;

  ratingCount: number;
  completedOrders: number;
  subscription: string | null;
}

export interface GetSupplierDetailsResponse extends ApiResponseBase {
  supplier: SupplierDetails;
}

export interface deactivateResponse {
  success: boolean;
  message: string;
  messageAr: string;
}

// customers part
export interface Customer {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  city: string | null;
  avatarUrl: string | null;
  status: string;
  isPhoneVerified: boolean;
  totalOrders: number;
  favoritesCount: number;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface CustomersResponse {
  success: boolean;
  message: string | null;
  messageAr: string | null;
  customers: Customer[];
  totalCount: number;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface CustomerActionBody {
  reason: string;
  adminNotes: string;
}

export interface GetCustomersParams {
  Page?: number;
  PageSize?: number;
  Search?: string;
  Status?: string;
  City?: string;
}
