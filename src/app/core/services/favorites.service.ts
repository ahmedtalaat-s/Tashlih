import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, PLATFORM_ID } from '@angular/core';
import { API_CONSTSANTS } from '../../constants/api.constants';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { FavoritePart, FavoritePartsResponse } from '../models/parts.model';
import { FavoriteSuppliersResponse } from '../models/supplier.model';
import { StorageHelper } from '../../helpers/storage.helper';
import { APP_CONSTANTS } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const token = StorageHelper.getItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
      if (token) {
        this.loadFavoriteParts().subscribe();
        this.loadFavoriteSuppliers().subscribe();
      }
    }
  }

  /* ===================== SIGNAL STATE ===================== */

  private favoritePartIds = signal<Set<number>>(new Set());
  private favoriteSupplierIds = signal<Set<number>>(new Set());

  // Exposed readonly signals
  readonly favoriteParts = computed(() => [...this.favoritePartIds()]);
  readonly favoriteSuppliers = computed(() => [...this.favoriteSupplierIds()]);

  /* ===================== INIT ===================== */

  loadFavoriteParts() {
    return this.http
      .get<FavoritePartsResponse>(
        `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.FAVORITES.PARTS.LIST}`,
      )
      .pipe(
        tap((res) => {
          this.favoritePartIds.set(new Set(res.parts.map((p: FavoritePart) => p.partId)));
          if (isPlatformBrowser(this.platformId)) {
            console.log('BROWSER LOG:', this.favoritePartIds());
          }
        }),
      );
  }

  loadFavoriteSuppliers() {
    return this.http
      .get<FavoriteSuppliersResponse>(
        `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.FAVORITES.SUPPLIERS.LIST}`,
      )
      .pipe(
        tap((res) => {
          this.favoriteSupplierIds.set(new Set(res.suppliers.map((s) => s.supplierId)));
        }),
      );
  }

  /* ===================== PARTS ===================== */

  addPart(partId: number) {
    return this.http
      .post(
        `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.FAVORITES.PARTS.ADD(partId)}`,
        {},
      )
      .pipe(
        tap(() => {
          this.favoritePartIds.update((set) => new Set(set).add(partId));
        }),
      );
  }

  removePart(partId: number) {
    return this.http
      .delete(
        `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.FAVORITES.PARTS.REMOVE(partId)}`,
      )
      .pipe(
        tap(() => {
          this.favoritePartIds.update((set) => {
            const updated = new Set(set);
            updated.delete(partId);
            return updated;
          });
        }),
      );
  }

  // GET /api/Favorites/parts
  getFavoriteParts() {
    return this.http.get<FavoritePartsResponse>(
      `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.FAVORITES.PARTS.LIST}`,
    );
  }

  // GET /api/Favorites/parts/{partId}/check
  checkPartFavorite(partId: number | string) {
    return this.http.get(
      `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.FAVORITES.PARTS.CHECK(partId)}`,
    );
  }

  /* =================== SUPPLIERS =================== */

  addSupplier(supplierId: number) {
    return this.http
      .post(
        `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.FAVORITES.SUPPLIERS.ADD(supplierId)}`,
        {},
      )
      .pipe(
        tap(() => {
          this.favoriteSupplierIds.update((set) => new Set(set).add(supplierId));
        }),
      );
  }

  removeSupplier(supplierId: number) {
    return this.http
      .delete(
        `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.FAVORITES.SUPPLIERS.REMOVE(supplierId)}`,
      )
      .pipe(
        tap(() => {
          this.favoriteSupplierIds.update((set) => {
            const updated = new Set(set);
            updated.delete(supplierId);
            return updated;
          });
        }),
      );
  }

  // GET /api/Favorites/suppliers
  getFavoriteSuppliers() {
    return this.http.get<FavoriteSuppliersResponse>(
      `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.FAVORITES.SUPPLIERS.LIST}`,
    );
  }

  // GET /api/Favorites/suppliers/{supplierId}/check
  checkSupplierFavorite(supplierId: number | string) {
    return this.http.get(
      `${API_CONSTSANTS.BASE_URL}${API_CONSTSANTS.END_POINTS.FAVORITES.SUPPLIERS.CHECK(supplierId)}`,
    );
  }

  isPartFavorite(partId: number): boolean {
    return this.favoritePartIds().has(partId);
  }

  isSupplierFavorite(supplierId: number): boolean {
    return this.favoriteSupplierIds().has(supplierId);
  }
}
