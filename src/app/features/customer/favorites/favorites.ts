import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FavoritesSuppliersTable } from './favorites-suppliers-table/favorites-suppliers-table';
import { FavoritesPartsTable } from './favorites-parts-table/favorites-parts-table';
import { FavoritePart } from '../../../core/models/parts.model';
import { FavoriteSupplier } from '../../../core/models/supplier.model';
import { LucideAngularModule, Search } from 'lucide-angular';
import { FavoritesService } from '../../../core/services/favorites.service';
type FavoritesTab = 'parts' | 'suppliers';

@Component({
  selector: 'app-favorites',
  imports: [
    FormsModule,
    CommonModule,
    FavoritesSuppliersTable,
    FavoritesPartsTable,
    LucideAngularModule,
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  readonly searchIcon = Search;
  private platform = inject(PLATFORM_ID);
  private favoriteService = inject(FavoritesService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadSuppliers();
      this.loadParts();
    }
  }

  loadSuppliers() {
    this.favoriteService.getFavoriteSuppliers().subscribe({
      next: (res) => {
        this.suppliers = res.suppliers;
        this.suppliersCount = res.totalCount;
      },
    });
  }

  loadParts() {
    this.favoriteService.getFavoriteParts().subscribe({
      next: (res) => {
        this.parts = res.parts;
        this.partsCount = res.totalCount;
      },
    });
  }

  openPartDetails($event: number) {}
  activeTab: FavoritesTab = 'parts';
  searchTerm: string = '';
  suppliers!: FavoriteSupplier[];
  suppliersCount!: number;
  parts!: FavoritePart[];
  partsCount!: number;

  setTab(tab: FavoritesTab) {
    this.activeTab = tab;
  }
  deleteSupplier(id: number) {
    this.favoriteService.removeSupplier(id).subscribe({
      next: (value) => {
        this.suppliers = this.suppliers.filter((s) => s.id !== id);
      },
    });
  }
  deletePart(id: number) {
    this.favoriteService.removePart(id).subscribe({
      next: (value) => {
        this.parts = this.parts.filter((s) => s.id !== id);
      },
    });
  }
}
