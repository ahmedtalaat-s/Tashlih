import { Part } from '../../../core/models/parts.model';

export interface PartSearchParams {
  Keyword?: string;
  CategoryId?: number;
  VehicleTypeId?: number;
  VehicleSubcategoryId?: number;
  MakeId?: number;
  ModelId?: number;
  Year?: number;
  ConditionId?: number;
  MinPrice?: number;
  MaxPrice?: number;
  CityId?: number;
  HasWarranty?: boolean | null;
  DeliveryAvailable?: boolean | null;
  Page?: number;
  PageSize?: number;
}

export interface PartsSearchResponse {
  success: boolean;
  message: string | null;
  messageAr: string | null;
  parts: Part[];
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
