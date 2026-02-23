import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONSTANTS } from '../../../constants/api.constants';
import {
  GetSuppliersParams,
  GetSuppliersResponse,
  VerifySupplierRequest,
} from '../../models/admin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminSupplierService {
  private http = inject(HttpClient);
  baseUrl = API_CONSTANTS.BASE_URL;

  getSuppliers(paramsObj?: GetSuppliersParams): Observable<GetSuppliersResponse> {
    let params = new HttpParams();

    if (paramsObj) {
      Object.entries(paramsObj).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value as any);
        }
      });
    }

    return this.http.get<GetSuppliersResponse>(
      this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.GET_ALL,
      { params },
    );
  }

  getPendingSuppliers(
    Page: number,
    PageSize: number,
    keyword?: string,
  ): Observable<GetSuppliersResponse> {
    let param: GetSuppliersParams = {
      Page,
      PageSize,
      Search: keyword,
      VerificationStatus: 'pending_review',
    };
    return this.getSuppliers(param);
  }

  // GET /api/Admin/suppliers/{id}
  getSupplierById(id: number | string): Observable<any> {
    return this.http.get(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.GET_BY_ID(id));
  }

  // DELETE /api/Admin/suppliers/{id}
  deleteSupplier(id: number | string): Observable<any> {
    return this.http.delete(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.DELETE(id));
  }

  // PUT /api/Admin/suppliers/{id}/verify
  verifySupplier(id: number | string, body: VerifySupplierRequest): Observable<any> {
    return this.http.put(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.VERIFY(id), body);
  }

  activateSupplier(id: any, reason?: string, adminNotes?: string) {
    return this.http.put(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.ACTIVATE(id), {
      reason,
      adminNotes,
    });
  }
  deactivateSupplier(id: any, reason?: string, adminNotes?: string) {
    return this.http.put(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.DEACTIVATE(id), {
      reason,
      adminNotes,
    });
  }
}
