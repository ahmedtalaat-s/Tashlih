import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONSTANTS } from '../../../constants/api.constants';
import { Observable } from 'rxjs';
import { Plan, PlanRequest, PlansResponse } from '../../models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class SubscribtionPlansService {
  private http = inject(HttpClient);
  baseUrl = API_CONSTANTS.BASE_URL;

  getPlans(): Observable<PlansResponse> {
    return this.http.get<PlansResponse>(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.PLANS);
  }

  deletePlan(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.PLANS}/${id}`);
  }

  createPlan(data: PlanRequest): Observable<any> {
    const formData = this.buildFormData(data);

    return this.http.post(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.PLANS, formData);
  }

  // ========================
  // UPDATE PLAN
  // ========================
  updatePlan(id: number, data: PlanRequest): Observable<any> {
    const formData = this.buildFormData(data);

    return this.http.put(`${this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.PLANS}/${id}`, formData);
  }

  // helper for formdata
  private buildFormData(data: PlanRequest): FormData {
    const formData = new FormData();

    formData.append('NameAr', data.NameAr);

    if (data.NameEn) formData.append('NameEn', data.NameEn);
    if (data.DescriptionAr) formData.append('DescriptionAr', data.DescriptionAr);
    if (data.DescriptionEn) formData.append('DescriptionEn', data.DescriptionEn);

    formData.append('Currency', data.Currency);
    formData.append('Price', data.Price.toString());
    formData.append('DurationDays', data.DurationDays.toString());

    if (data.MaxParts !== undefined) formData.append('MaxParts', data.MaxParts.toString());

    formData.append('MaxImagesPerPart', data.MaxImagesPerPart.toString());
    formData.append('MaxShops', data.MaxShops.toString());

    formData.append('IsActive', data.IsActive.toString());

    if (data.IsPopular !== undefined) formData.append('IsPopular', data.IsPopular.toString());

    if (data.BadgeText) formData.append('BadgeText', data.BadgeText);

    formData.append('SortOrder', data.SortOrder.toString());

    if (data.logo) formData.append('logo', data.logo);

    return formData;
  }
}
