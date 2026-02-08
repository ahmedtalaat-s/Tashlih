import { inject, Injectable } from '@angular/core';
import { StorageHelper } from '../../helpers/storage.helper';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { CustomerProfileResponse } from '../models/customerProfile.model';
import { AuthService } from './auth.service';
import { CustomerProfileService } from './customer-profile.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authservice = inject(AuthService);
  private customerService = inject(CustomerProfileService);

  getuserInfo(): Observable<CustomerProfileResponse | null> {
    if (!this.authservice.isCustomer()) {
      return of(null);
    }
    const cached = StorageHelper.getItem<CustomerProfileResponse>(
      APP_CONSTANTS.STORAGE_KEYS.USER_INFO,
    );

    if (cached) {
      return of(cached);
    }
    return this.customerService.getMyProfile();
  }
  get phoneNumber(): string | null {
    return StorageHelper.getItem<string>(APP_CONSTANTS.STORAGE_KEYS.PHONE_NUMBER);
  }
  set phoneNumber(value: string) {
    if (value) {
      StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.PHONE_NUMBER, value);
    }
  }
}
