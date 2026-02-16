import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONSTANTS } from '../../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AdminLookupsService {
  private http = inject(HttpClient);
  baseUrl = API_CONSTANTS.BASE_URL;

  // =============================
  // Vehicle Types
  // =============================

  createVehicleType(data: { nameAr: string; nameEn: string }) {
    return this.http.post(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.VEHICLE_TYPES, data);
  }

  updateVehicleType(id: number, data: { nameAr: string; nameEn: string }) {
    return this.http.put(
      `${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.VEHICLE_TYPES}/${id}`,
      data,
    );
  }

  deleteVehicleType(id: number) {
    return this.http.delete(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.VEHICLE_TYPES}/${id}`);
  }

  // =============================
  // Makes
  // =============================

  createMake(data: { nameAr: string; nameEn: string; vehicleTypeId: number }) {
    return this.http.post(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.MAKES, data);
  }

  updateMake(id: number, data: { nameAr: string; nameEn: string; vehicleTypeId: number }) {
    return this.http.put(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.MAKES}/${id}`, data);
  }

  deleteMake(id: number) {
    return this.http.delete(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.MAKES}/${id}`);
  }

  // =============================
  // Models
  // =============================

  createModel(data: { nameAr: string; nameEn: string; makeId: number }) {
    return this.http.post(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.MODELS, data);
  }

  updateModel(id: number, data: { nameAr: string; nameEn: string; makeId: number }) {
    return this.http.put(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.MODELS}/${id}`, data);
  }

  deleteModel(id: number) {
    return this.http.delete(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.MODELS}/${id}`);
  }

  // =============================
  // Categories (FormData)
  // =============================

  createCategory(formData: FormData) {
    return this.http.post(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.CATEGORIES, formData);
  }

  updateCategory(id: number, formData: FormData) {
    return this.http.put(
      `${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.CATEGORIES}/${id}`,
      formData,
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.CATEGORIES}/${id}`);
  }

  // =============================
  // Subcategories
  // =============================

  createSubCategory(data: { nameAr: string; nameEn: string; vehicleTypeId: number }) {
    return this.http.post(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.SUBCATEGORIES, data);
  }

  updateSubCategory(id: number, data: { nameAr: string; nameEn: string; vehicleTypeId: number }) {
    return this.http.put(
      `${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.SUBCATEGORIES}/${id}`,
      data,
    );
  }

  deleteSubCategory(id: number) {
    return this.http.delete(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.SUBCATEGORIES}/${id}`);
  }

  // =============================
  // Cities
  // =============================

  createCity(data: { nameAr: string; nameEn: string }) {
    return this.http.post(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.CITIES, data);
  }

  updateCity(id: number, data: { nameAr: string; nameEn: string }) {
    return this.http.put(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.CITIES}/${id}`, data);
  }

  deleteCity(id: number) {
    return this.http.delete(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.CITIES}/${id}`);
  }

  // =============================
  // Part Conditions
  // =============================

  createPartCondition(data: { key: string; nameAr: string; nameEn: string }) {
    return this.http.post(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.PART_CONDITIONS, data);
  }

  updatePartCondition(id: number, data: { key: string; nameAr: string; nameEn: string }) {
    return this.http.put(
      `${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.PART_CONDITIONS}/${id}`,
      data,
    );
  }

  deletePartCondition(id: number) {
    return this.http.delete(
      `${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.PART_CONDITIONS}/${id}`,
    );
  }

  // =============================
  // Warranty Types
  // =============================

  createWarrantyType(data: { key: string; nameAr: string; nameEn: string; days: number }) {
    return this.http.post(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.WARRANTY_TYPES, data);
  }

  updateWarrantyType(
    id: number,
    data: { key: string; nameAr: string; nameEn: string; days: number },
  ) {
    return this.http.put(
      `${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.WARRANTY_TYPES}/${id}`,
      data,
    );
  }

  deleteWarrantyType(id: number) {
    return this.http.delete(
      `${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.WARRANTY_TYPES}/${id}`,
    );
  }

  // =============================
  // Years
  // =============================

  createYear(data: { year: number }) {
    return this.http.post(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.YEARS, data);
  }

  updateYear(id: number, data: { year: number }) {
    return this.http.put(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.YEARS}/${id}`, data);
  }

  deleteYear(id: number) {
    return this.http.delete(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.YEARS}/${id}`);
  }
}
