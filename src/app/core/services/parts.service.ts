import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONSTSANTS } from '../../constants/api.constants';
import { PartsResponse } from '../models/parts.model';

@Injectable({
  providedIn: 'root',
})
export class PartsServices {
  private http = inject(HttpClient);

  private getPartsList(url: string, count: number = 10) {
    return this.http.get<PartsResponse>(url, {
      params: { count },
    });
  }

  getFeaturedParts(count?: number) {
    return this.getPartsList(API_CONSTSANTS.END_POINTS.PARTS.FEATURED, count);
  }

  getLatestParts(count?: number) {
    return this.getPartsList(API_CONSTSANTS.END_POINTS.PARTS.LATEST, count);
  }
}
