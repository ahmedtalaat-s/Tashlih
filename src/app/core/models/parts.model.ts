export interface PartImage {
  id: number;
  imageUrl: string;
  thumbnailUrl: string | null;
  isPrimary: boolean;
  displayOrder: number;
}

export interface Part {
  id: number;
  supplierId: number;
  supplierName: string;
  city: string;
  nameAr: string;
  nameEn: string;
  description: string;
  partNumber: string;
  oemNumber: string;
  vinNumber: string;
  condition: string;
  conditionAr: string;
  conditionDetails: string | null;
  warrantyType: string;
  warrantyTypeAr: string;
  warrantyDays: number;
  price: number;
  originalPrice: number;
  currency: string;
  discountPercent: number;
  quantity: number;
  status: string;
  isAvailable: boolean;
  categoryId: number;
  categoryNameAr: string;
  categoryNameEn: string;
  customCategory: string | null;
  categoryDisplay: string;
  vehicleTypeId: number;
  vehicleTypeNameAr: string;
  vehicleTypeNameEn: string;
  customVehicleType: string | null;
  vehicleTypeDisplay: string;
  vehicleSubcategoryId: number;
  subcategoryNameAr: string;
  subcategoryNameEn: string;
  customSubcategory: string | null;
  subcategoryDisplay: string;
  makeId: number;
  makeNameAr: string;
  makeNameEn: string;
  makeLogoUrl: string;
  customMake: string | null;
  makeDisplay: string;
  modelId: number;
  modelNameAr: string;
  modelNameEn: string;
  customModel: string | null;
  modelDisplay: string;
  yearFrom: number;
  yearTo: number;
  yearRange: string;
  deliveryAvailable: boolean;
  deliveryByShop: boolean;
  deliveryNotes: string;
  viewsCount: number;
  salesCount: number;
  favoritesCount: number;
  primaryImageUrl: string;
  images: PartImage[];
  createdAt: string;
  updatedAt: string;
}

export interface PartsResponse {
  success: boolean;
  message: string | null;
  messageAr: string | null;
  parts: Part[];
  pagination: any; // can be updated if pagination object is known
}
