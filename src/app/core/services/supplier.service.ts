import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONSTANTS } from '../../constants/api.constants';
import {
  GetSupplierByIdResponse,
  nearbySupplierRequest,
  NearbySuppliersResponse,
  supplierListResponse,
  suppliersSearchResponse,
} from '../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private http = inject(HttpClient);

  // get supplier by id
  getSupplierById(id: number | string) {
    return this.http.get<GetSupplierByIdResponse>(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.SUPPLIERS.GET_BY_ID(id)}`,
    );
  }
  // get a list of suppliers
  getSuppliersList(city: string) {
    return city == ''
      ? this.http.get<supplierListResponse>(
          `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.SUPPLIERS.LIST}`,
        )
      : this.http.get<supplierListResponse>(
          `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.SUPPLIERS.LIST}`,
          { params: { city } },
        );
  }
  //get the neraby suppliers
  getNearbySuppliers(params: nearbySupplierRequest) {
    return this.http.get<NearbySuppliersResponse>(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.SUPPLIERS.NEARBY}`,
      {
        params: {
          ...params,
        },
      },
    );
  }

  // GET /api/Suppliers/my-statistics
  getMyStatistics() {
    return this.http.get<any>(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.SUPPLIERS.MY_STATISTICS}`,
    );
  }

  // GET /api/Suppliers/dashboard
  getDashboard() {
    return this.http.get<any>(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.SUPPLIERS.DASHBOARD}`,
    );
  }

  // GET /api/Suppliers/search
  searchSuppliers(params: {
    Search?: string;
    categoryId?: number;
    City?: number;
    page?: number;
    pageSize?: number;
  }) {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, value);
      }
    });

    return this.http.get<suppliersSearchResponse>(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.SUPPLIERS.SEARCH}`,
      {
        params: httpParams,
      },
    );
  }
}
