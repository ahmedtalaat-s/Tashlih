import { Injectable } from '@angular/core';
import { StorageHelper } from '../../helpers/storage.helper';
import { APP_CONSTANTS } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  get phoneNumber(): string | null {
    return StorageHelper.getItem<string>(APP_CONSTANTS.STORAGE_KEYS.PHONE_NUMBER);
  }
}
