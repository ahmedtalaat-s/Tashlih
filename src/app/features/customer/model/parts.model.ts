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
}
