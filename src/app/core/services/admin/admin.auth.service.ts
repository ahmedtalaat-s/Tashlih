import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Admin, adminLoginResponse } from '../../models/admin.model';
import { APP_CONSTANTS } from '../../../constants/app.constants';
import { API_CONSTANTS } from '../../../constants/api.constants';
import { TokenService } from '../token.service';
import { StorageHelper } from '../../../helpers/storage.helper';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private http = inject(HttpClient);
  private token = inject(TokenService);
  baseUrl = API_CONSTANTS.BASE_URL;

  login(email: string, password: string): Observable<adminLoginResponse> {
    return this.http
      .post<adminLoginResponse>(this.baseUrl + API_CONSTANTS.END_POINTS.ADMIN.LOGIN, {
        email,
        password,
      })
      .pipe(
        map((res) => {
          this.token.setToken(res.token);
          this.setAdminInLocal(res.admin);
          StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.ROLE, 'admin');
          return res;
        }),
      );
  }

  setAdminInLocal(admin: Admin) {
    StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.ADMIN, admin);
  }
  getAdmin() {
    StorageHelper.getItem(APP_CONSTANTS.STORAGE_KEYS.ADMIN);
  }
}
