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
