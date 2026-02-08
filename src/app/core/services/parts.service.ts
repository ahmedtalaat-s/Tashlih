import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONSTANTS } from '../../constants/api.constants';
import { PartResponse, PartsResponse } from '../models/parts.model';
import { CategoriesResponse } from '../models/categories.model';
import { Observable } from 'rxjs';
import { PartSearchParams, PartsSearchResponse } from '../../features/customer/model/parts.model';

@Injectable({
  providedIn: 'root',
})
export class PartsServices {
  private http = inject(HttpClient);

  private getPartsList(url: string, count: number = 10) {
    return this.http.get<PartsResponse>(API_CONSTANTS.BASE_URL + url, {
      params: { count },
    });
  }

  getFeaturedParts(count?: number) {
    return this.getPartsList(API_CONSTANTS.END_POINTS.PARTS.FEATURED, count);
  }

  getLatestParts(count?: number) {
    return this.getPartsList(API_CONSTANTS.END_POINTS.PARTS.LATEST, count);
  }

  getPartById(partId: number) {
    return this.http.get<PartResponse>(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.PARTS.GET_BY_ID(partId),
    );
  }

  // categroies
  getPartCategories(hierarchical: boolean = false) {
    return this.http.get<CategoriesResponse>(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.LOOKUPS.CATEGORIES,
      {
        params: { hierarchical },
      },
    );
  }

  getPartsBySupplierId(supplierId: number, page: number, pageSize: number = 10) {
    return this.http.get<PartsResponse>(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.PARTS.BY_SUPPLIER(supplierId),
      {
        params: { page, pageSize },
      },
    );
  }

  searchParts(params: PartSearchParams): Observable<PartsSearchResponse> {
    let httpParams = new HttpParams();

    // Only append params that are defined
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, value.toString());
      }
    });
    console.log(httpParams);

    return this.http.get<PartsSearchResponse>(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.PARTS.SEARCH,
      { params: httpParams },
    );
  }
}
