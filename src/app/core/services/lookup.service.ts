import { inject, Injectable } from '@angular/core';
import { API_CONSTANTS } from '../../constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CityResponse,
  MakeResponse,
  PartConditionResponse,
  SubcategoryResponse,
  VehicleModelResponse,
  VehicleTypeResponse,
  WarrantyTypeResponse,
  YearResponse,
} from '../models/lookups.model';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  private readonly baseUrl = API_CONSTANTS.BASE_URL;

  private http = inject(HttpClient);

  // ===== Vehicle Types =====
  getVehicleTypes(): Observable<VehicleTypeResponse> {
    return this.http.get<VehicleTypeResponse>(
      `${this.baseUrl}${API_CONSTANTS.END_POINTS.LOOKUPS.VEHICLE_TYPES}`,
    );
  }

  // ===== Subcategories =====
  getSubcategories(): Observable<SubcategoryResponse> {
    return this.http.get<SubcategoryResponse>(
      `${this.baseUrl}${API_CONSTANTS.END_POINTS.LOOKUPS.SUBCATEGORIES}`,
    );
  }

  getSubcategoriesByVehicleType(vehicleTypeId: number | string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}${API_CONSTANTS.END_POINTS.LOOKUPS.VEHICLE_TYPE_SUBCATEGORIES(vehicleTypeId)}`,
    );
  }

  // ===== Makes =====
  getMakes(): Observable<MakeResponse> {
    return this.http.get<MakeResponse>(`${this.baseUrl}${API_CONSTANTS.END_POINTS.LOOKUPS.MAKES}`);
  }

  getMakesByVehicleType(vehicleTypeId: number | string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}${API_CONSTANTS.END_POINTS.LOOKUPS.VEHICLE_TYPE_MAKES(vehicleTypeId)}`,
    );
  }

  // ===== Models =====
  getModels(): Observable<VehicleModelResponse> {
    return this.http.get<VehicleModelResponse>(
      `${this.baseUrl}${API_CONSTANTS.END_POINTS.LOOKUPS.MODELS}`,
    );
  }

  getModelsByMake(makeId: number | string): Observable<any> {
    return this.http.get(`${this.baseUrl}${API_CONSTANTS.END_POINTS.LOOKUPS.MAKE_MODELS(makeId)}`);
  }

  // ===== Years =====
  getYears(): Observable<YearResponse> {
    return this.http.get<YearResponse>(`${this.baseUrl}${API_CONSTANTS.END_POINTS.LOOKUPS.YEARS}`);
  }

  // ===== Cities =====
  getCities(): Observable<CityResponse> {
    return this.http.get<CityResponse>(`${this.baseUrl}${API_CONSTANTS.END_POINTS.LOOKUPS.CITIES}`);
  }

  // ===== Part Conditions =====
  getPartConditions(): Observable<PartConditionResponse> {
    return this.http.get<PartConditionResponse>(
      `${this.baseUrl}${API_CONSTANTS.END_POINTS.LOOKUPS.PART_CONDITIONS}`,
    );
  }

  // ===== Warranty Types =====
  getWarrantyTypes(): Observable<WarrantyTypeResponse> {
    return this.http.get<WarrantyTypeResponse>(
      `${this.baseUrl}${API_CONSTANTS.END_POINTS.LOOKUPS.WARRANTY_TYPES}`,
    );
  }
}
