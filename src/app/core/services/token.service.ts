import { Injectable } from '@angular/core';
import { StorageHelper } from '../../helpers/storage.helper';
import { APP_CONSTANTS } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  setToken(token: string): void {
    StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN, token);
  }

  getToken(): string | null {
    return StorageHelper.getItem<string>(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
  }

  removeToken(): void {
    StorageHelper.removeItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
  }
}
