import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import {
  LucideAngularModule,
  Heart,
  Image,
  Phone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-angular';
import { SupplierService } from '../../../../core/services/supplier.service';
import { Supplier } from '../../../../core/models/supplier.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FavoritesService } from '../../../../core/services/favorites.service';
@Component({
  selector: 'app-supplier-carouserl',
  imports: [LucideAngularModule],
  templateUrl: './supplier-carouserl.html',
  styleUrl: './supplier-carouserl.css',
})
export class SupplierCarouserl implements OnInit {
  @ViewChild('carousel', { static: true })
  carousel!: ElementRef<HTMLDivElement>;

  readonly HeartIcon = Heart;
  readonly ImageIcon = Image;
  readonly PhoneIcon = Phone;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;

  suppliers: Supplier[] = [];

  private suppliersService = inject(SupplierService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private favoritesService = inject(FavoritesService);

  ngOnInit(): void {
    this.loadSuppliers();
  }
  loadSuppliers() {
    this.suppliersService.getSuppliersList('').subscribe((res) => {
      this.suppliers = res.suppliers;
    });
  }

  openSupplierProfilePage(supplierId: number) {
    this.router.navigate(['/customer/supplier-profile', supplierId]);
  }

  scrollNext() {
    this.carousel.nativeElement.scrollBy({
      left: -300, // RTL
      behavior: 'smooth',
    });
  }

  scrollPrev() {
    this.carousel.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
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
