import { Injectable, signal } from '@angular/core';
import { StorageHelper } from '../../helpers/storage.helper';
import { APP_CONSTANTS } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _defaultLanguage = signal<string>('ar');
  defaultLanguage = this._defaultLanguage.asReadonly();

  constructor() {
    const savedlanguage: string | null = StorageHelper.getItem(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE);
    if (savedlanguage) {
      this._defaultLanguage.set(savedlanguage);
    } else {
      StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE, this._defaultLanguage());
    }
  }

  setLanguage(language: string): void {
    this._defaultLanguage.set(language);
    StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE, language);
  }
  clearLanguage(): void {
    StorageHelper.removeItem(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE);
    this._defaultLanguage.set('ar');
  }
}
