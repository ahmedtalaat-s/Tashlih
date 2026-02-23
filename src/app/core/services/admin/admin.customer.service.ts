import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONSTANTS } from '../../../constants/api.constants';
import { Observable } from 'rxjs';
import {
  CustomersResponse,
  Customer,
  CustomerActionBody,
  GetCustomersParams,
} from '../../models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminCustomerService {
  private http = inject(HttpClient);
  baseUrl = API_CONSTANTS.BASE_URL;

  getCustomers(paramsObj: GetCustomersParams): Observable<CustomersResponse> {
    let params = new HttpParams();

    if (paramsObj) {
      Object.entries(paramsObj).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value as any);
        }
      });
    }

    return this.http.get<CustomersResponse>(
      this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.GET_ALL_CUSTOMERS,
      {
        params,
      },
    );
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.GET_CUSTOMER_BY_ID(id),
    );
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.DELETE_CUSTOMER(id));
  }

  activateCustomer(id: number, body: CustomerActionBody): Observable<any> {
    return this.http.put(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.ACTIVATE_CUSTOMER(id), body);
  }

  deactivateCustomer(id: number, body: CustomerActionBody): Observable<any> {
    return this.http.put(
      this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.DEACTIVATE_CUSTOMER(id),
      body,
    );
  }
}
