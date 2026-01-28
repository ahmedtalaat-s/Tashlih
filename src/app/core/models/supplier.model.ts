import { Part } from './parts.model';
export interface nearbySupplierRequest {
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
}
export interface Supplier {
  id: number;

  businessNameAr: string;
  businessNameEn: string | null;

  logoUrl: string | null;

  city: string;
  district: string;

  isVerified: boolean;

  ratingAverage: number;
  ratingCount: number;

  partsCount: number;
}
export interface supplierListResponse {
  success: boolean;
  message: string | null;
  messageAr: string | null;
  suppliers: Supplier[];
}

export interface NearbySupplier {
  id: number;

  businessNameAr: string;
  businessNameEn: string | null;

  logoUrl: string | null;

  city: string;
  district: string;

  latitude: number;
  longitude: number;
  distance: number; // usually in KM (حسب الـ backend)

  isVerified: boolean;

  ratingAverage: number;
  partsCount: number;
}
export interface NearbySuppliersResponse {
  success: boolean;
  message: string | null;
  messageAr: string | null;

  suppliers: NearbySupplier[];
}

export interface FavoriteSuppliersResponse {
  success: boolean;
  message: string | null;
  messageAr: string | null;
  suppliers: FavoriteSupplier[];
  totalCount: number;
}

export interface FavoriteSupplier {
  id: number;
  supplierId: number;
  supplierName: string;
  businessType: string;
  supplierLogo: string | null;
  city: string;
  district: string;
  phone: string;
  ratingAverage: number;
  ratingCount: number;
  partsCount: number;
  isVerified: boolean;
  addedAt: string; // ISO Date string
}

// get supplier by id response
export interface GetSupplierByIdResponse {
  success: boolean;
  message: string | null;
  messageAr: string | null;
  supplier: SupplierById;
}
export interface SupplierById {
  id: number;
  fullName: string;
  businessNameAr: string;
  businessNameEn: string;
  description: string | null;
  businessType: string;
  logoUrl: string | null;
  city: string;
  district: string;
  phone: string;
  latitude: number | null;
  longitude: number | null;
  isVerified: boolean;

  ratingAverage: number;
  ratingCount: number;
  totalOrders: number;
  completedOrders: number;
  partsCount: number;

  createdAt: string;

  parts: Part[];
  ratingBreakdown: RatingBreakdown;
  reviews: Review[];
}

export interface RatingBreakdown {
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
}

export interface Review {
  id?: number;
  rating?: number;
  comment?: string;
  createdAt?: string;
}
