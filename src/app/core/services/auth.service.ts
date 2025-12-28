import { HttpClient } from '@angular/common/http';
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { map, Observable, of } from 'rxjs';
import { StorageHelper } from '../../helpers/storage.helper';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { API_CONSTSANTS } from '../../constants/api.constants';
import {
  getUserResponse,
  registerCustomerRequest,
  registerCustomerResponse,
  sendOtpResponse,
} from '../models/auth.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  destroyref = inject(DestroyRef);

  userInfo = signal<User | null>(null);
  role = computed(() => this.userInfo()?.userType);
  email = computed(() => this.userInfo()?.email);
  phoneNumber = computed(() => this.userInfo()?.phone);
  id = computed(() => this.userInfo()?.id);
  constructor() {
    const token = StorageHelper.getItem<string>(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
    if (token) {
      this.getCurrentUser().pipe(takeUntilDestroyed(this.destroyref)).subscribe();
    }
  }

  // fetch current user info
  getCurrentUser(): Observable<User | null> {
    const user = StorageHelper.getItem<User>(APP_CONSTANTS.STORAGE_KEYS.USER);
    if (user) {
      this.userInfo.set(user);
      return of(user);
    } else {
      return this.http
        .get<getUserResponse>(`${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.AUTH.ME}`)
        .pipe(
          map((response) => {
            if (response.success) {
              this.userInfo.set(response.user);
              StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.USER, response.user);
              return response.user;
            }
            return null;
          })
        );
    }
  }

  // register cutomer user
  registerCustomer(userData: registerCustomerRequest): Observable<registerCustomerResponse> {
    return this.http
      .post<registerCustomerResponse>(
        `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.AUTH.REGISTER_CUSTOMER}`,
        userData
      )
      .pipe(
        map((response) => {
          if (response.success) {
            StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.PHONE_NUMBER, userData.phone);
          }
          return response;
        })
      );
  }

  //send otp code to phone number
  sendOtpCode(phone: string, purpose: string): Observable<sendOtpResponse> {
    return this.http.post<sendOtpResponse>(
      `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.AUTH.SEND_OTP}`,
      { phone, purpose }
    );
  }

  //verify otp code
  //   {
  //   "phone": "string",
  //   "otpCode": "string"
  // }
  verifyOtpCode(phone: string, otpCode: string): Observable<sendOtpResponse> {
    return this.http.post<sendOtpResponse>(
      `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.AUTH.VERIFY_OTP}`,
      { phone, otpCode }
    );
  }

  // logout user
  logout(): void {
    this.userInfo.set(null);
    StorageHelper.clear();
    this.router.navigate(['/']);
  }
}
