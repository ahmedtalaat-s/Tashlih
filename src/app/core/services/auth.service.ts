import { HttpClient } from '@angular/common/http';
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { map, Observable, of } from 'rxjs';
import { StorageHelper } from '../../helpers/storage.helper';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { API_CONSTANTS } from '../../constants/api.constants';
import {
  getUserResponse,
  LoginOtpRequest,
  LoginOtpResponse,
  LoginRequest,
  LoginResponse,
  registerCustomerRequest,
  registerCustomerResponse,
  sendOtpResponse,
  SupplierRegisterRequest,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  destroyref = inject(DestroyRef);

  isloggedIn = computed(() => {
    // check memory first
    if (this.userInfo()) return true;

    // fallback: check storage
    const storedUser = StorageHelper.getItem<User>(APP_CONSTANTS.STORAGE_KEYS.USER);
    if (storedUser) {
      this.userInfo.set(storedUser);
      return true;
    }

    return false;
  });

  userInfo = signal<User | null>(StorageHelper.getItem<User>(APP_CONSTANTS.STORAGE_KEYS.USER));
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
  isCustomer = computed(() => this.role() == 'customer');

  // fetch current user info
  getCurrentUser(): Observable<User | null> {
    const user = StorageHelper.getItem<User>(APP_CONSTANTS.STORAGE_KEYS.USER);
    if (user) {
      this.userInfo.set(user);
      return of(user);
    } else {
      return this.http
        .get<getUserResponse>(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.AUTH.ME}`)
        .pipe(
          map((response) => {
            if (response.success) {
              this.userInfo.set(response.user);
              StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.USER, response.user);
              return response.user;
            }
            return null;
          }),
        );
    }
  }

  // register cutomer user
  registerCustomer(userData: registerCustomerRequest): Observable<registerCustomerResponse> {
    return this.http
      .post<registerCustomerResponse>(
        `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.AUTH.REGISTER_CUSTOMER}`,
        userData,
      )
      .pipe(
        map((response) => {
          if (response.success) {
            StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.PHONE_NUMBER, userData.phone);
          }
          return response;
        }),
      );
  }

  //send otp code to phone number
  sendOtpCode(phone: string, purpose: string): Observable<sendOtpResponse> {
    return this.http.post<sendOtpResponse>(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.AUTH.SEND_OTP}`,
      { phone, purpose },
    );
  }

  // verify otp code
  verifyOtpCode(phone: string, otpCode: string): Observable<sendOtpResponse> {
    return this.http.post<sendOtpResponse>(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.AUTH.VERIFY_OTP}`,
      { phone, otpCode },
    );
  }
  //register supplier user
  registerSupplier(userData: SupplierRegisterRequest): Observable<registerCustomerResponse> {
    const formData = this.getFormData(userData);
    return this.http.post<registerCustomerResponse>(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.AUTH.REGISTER_SUPPLIER}`,
      formData,
    );
  }

  // Helper function to convert object to FormData
  getFormData(data: SupplierRegisterRequest): FormData {
    const formData = new FormData();

    formData.append('FullName', data.fullName);
    formData.append('Phone', data.phone);
    if (data.email) formData.append('Email', data.email);
    formData.append('Password', data.password);

    formData.append('BusinessNameAr', data.businessNameAr);
    if (data.businessNameEn) formData.append('BusinessNameEn', data.businessNameEn);

    formData.append('BusinessType', data.businessType);
    formData.append('City', data.city);
    if (data.district) formData.append('District', data.district);

    formData.append('CommercialRegisterNumber', data.commercialRegisterNumber);

    formData.append('CommercialRegisterImage', data.commercialRegisterImage);

    formData.append('IdentityImage', data.identityImage);

    if (data.logo) formData.append('Logo', data.logo);

    if (data.latitude !== undefined) formData.append('Latitude', data.latitude.toString());

    if (data.longitude !== undefined) formData.append('Longitude', data.longitude.toString());

    if (data.preferredLanguage) formData.append('PreferredLanguage', data.preferredLanguage);
    return formData;
  }

  //login user
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.AUTH.LOGIN}`, data)
      .pipe(
        map((response) => {
          if (response.success && response.token && response.user) {
            StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN, response.token);
            StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.USER, response.user);
            this.userInfo.set(response.user);
          }
          return response;
        }),
      );
  }

  //login with otp
  loginWithOtp(data: LoginOtpRequest): Observable<LoginOtpResponse> {
    return this.http
      .post<LoginOtpResponse>(
        `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.END_POINTS.AUTH.LOGIN_OTP}`,
        data,
      )
      .pipe(
        map((response) => {
          if (response.success && response.token && response.user) {
            StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN, response.token);
            StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.USER, response.user);
            this.userInfo.set(response.user);
          }
          return response;
        }),
      );
  }

  // logout user
  logout(): void {
    this.userInfo.set(null);
    StorageHelper.clear();
    this.router.navigate(['/']);
  }
}
