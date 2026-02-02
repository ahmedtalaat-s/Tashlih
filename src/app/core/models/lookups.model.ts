export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  messageAr: string | null;
  data: T;
  count: number;
}

export interface Category {
  id: number;
  parentId: number | null;
  parentNameAr: string | null;

  nameAr: string;
  nameEn: string;

  icon: string;
  sortOrder: number;
  level: number;

  children: Category[] | null;
}

export interface CategoriesResponse extends ApiResponse<Category[]> {}

export interface VehicleType {
  id: number;
  nameAr: string;
  nameEn: string;
  icon: string;
  sortOrder: number;
  subcategoriesCount: number;
}
export interface VehicleTypeResponse extends ApiResponse<VehicleType[]> {}
export interface Subcategory {
  id: number;
  vehicleTypeId: number;
  vehicleTypeNameAr: string;
  nameAr: string;
  nameEn: string;
  icon: string | null;
  sortOrder: number;
}

export interface SubcategoryResponse extends ApiResponse<Subcategory[]> {}
export interface Make {
  id: number;
  vehicleTypeId: number;
  vehicleTypeNameAr: string;
  nameAr: string;
  nameEn: string;
  logoUrl: string;
  country: string;
  sortOrder: number;
  isPopular: boolean;
  modelsCount: number;
}

export interface MakeResponse extends ApiResponse<Make[]> {}
export interface VehicleModel {
  id: number;
  makeId: number;
  makeNameAr: string;
  nameAr: string;
  nameEn: string;
  yearFrom: number;
  yearTo: number;
}

export interface VehicleModelResponse extends ApiResponse<VehicleModel[]> {}
export interface Year {
  id: number;
  year: number;
}
export interface YearResponse extends ApiResponse<Year[]> {}
export interface City {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface CityResponse extends ApiResponse<City[]> {}
export interface PartCondition {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface PartConditionResponse extends ApiResponse<PartCondition[]> {}
export interface WarrantyType {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface WarrantyTypeResponse extends ApiResponse<WarrantyType[]> {}
