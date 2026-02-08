import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { API_CONSTANTS } from '../../constants/api.constants';
import {
  CustomerProfileResponse,
  UpdateCustomerProfileRequest,
} from '../models/customerProfile.model';
import { StorageHelper } from '../../helpers/storage.helper';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { City } from '../models/lookups.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerProfileService {
  private http = inject(HttpClient);

  //get the customer profile and store in the local storage
  getMyProfile(): Observable<CustomerProfileResponse> {
    return this.http
      .get<CustomerProfileResponse>(
        API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.CUSTOMER_PROFILE.ME,
      )
      .pipe(
        map((res) => {
          StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.USER_INFO, res);
          return res;
        }),
      );
  }

  /** PUT: update full profile */
  updateProfile(payload: UpdateCustomerProfileRequest): Observable<any> {
    return this.http.put(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.CUSTOMER_PROFILE.UPDATE_PROFILE,
      payload,
    );
  }

  /** POST: upload profile image */
  uploadProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.CUSTOMER_PROFILE.UPLOAD_PROFILE_IMAGE,
      formData,
    );
  }

  /** DELETE: remove profile image */
  deleteProfileImage(): Observable<any> {
    return this.http.delete(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.CUSTOMER_PROFILE.DELETE_PROFILE_IMAGE,
    );
  }

  /** PUT: update location only */
  updateLocation(payload: {
    latitude: number;
    longitude: number;
    street: string;
    cityId: number;
    postalCode: string;
  }): Observable<any> {
    return this.http.put(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.CUSTOMER_PROFILE.UPDATE_LOCATION,
      payload,
    );
  }

  /** GET: cities list */
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.CUSTOMER_PROFILE.CITIES,
    );
  }
}
