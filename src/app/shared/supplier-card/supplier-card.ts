import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, Heart, Image, Phone, ChevronLeft } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { Supplier } from '../../core/models/supplier.model';
@Component({
  selector: 'app-supplier-card',
  imports: [LucideAngularModule],
  templateUrl: './supplier-card.html',
  styleUrl: './supplier-card.css',
})
export class SupplierCard {
  @Input() supplier!: Supplier;

  readonly HeartIcon = Heart;
  readonly ImageIcon = Image;
  readonly PhoneIcon = Phone;
  readonly ChevronLeftIcon = ChevronLeft;

  private router = inject(Router);
  private authService = inject(AuthService);
  private favoritesService = inject(FavoritesService);

  openSupplierProfilePage(supplierId: number) {
    this.router.navigate(['/customer/supplier-profile', supplierId]);
  }

  toggleFavorite(supplierId: number) {
    if (!this.authService.isloggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    const isFavorite = this.favoritesService.isSupplierFavorite(supplierId);
    const request$ = isFavorite
      ? this.favoritesService.removeSupplier(supplierId)
      : this.favoritesService.addSupplier(supplierId);

    request$.subscribe({
      error: () => {
        console.error('Failed to toggle favorite');
      },
    });
  }
  isFavorite(id: any): boolean {
    return this.favoritesService.isSupplierFavorite(id);
  }
}
