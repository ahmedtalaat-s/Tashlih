import { Component, inject, PLATFORM_ID } from '@angular/core';
import {
  Heart,
  Share2,
  MapPin,
  Image as ImageIcon,
  MessageCircle,
  Phone,
  Search,
  ChevronLeft,
  LucideAngularModule,
} from 'lucide-angular';
import { IProductCard } from '../../public/product/model/produtct';
import { ProductCard } from '../../public/product/product-card/product-card';
import { Part } from '../../../core/models/parts.model';
import { SupplierById } from '../../../core/models/supplier.model';
import { SupplierService } from '../../../core/services/supplier.service';
import { AuthService } from '../../../core/services/auth.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-supplier-profile',
  imports: [LucideAngularModule, ProductCard],
  templateUrl: './supplier-profile.html',
  styleUrl: './supplier-profile.css',
})
export class SupplierProfile {
  readonly heartIcon = Heart;
  readonly shareIcon = Share2;
  readonly locationIcon = MapPin;
  readonly imageIcon = ImageIcon;
  readonly chatIcon = MessageCircle;
  readonly phoneIcon = Phone;
  readonly searchIcon = Search;
  readonly chevronLeftIcon = ChevronLeft;

  private supplierService = inject(SupplierService);
  private authService = inject(AuthService);
  private favoriteService = inject(FavoritesService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(PLATFORM_ID);
  supplier!: SupplierById;
  parts!: Part[];
  filteredparts!: Part[];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id && isPlatformBrowser(this.platform)) this.loadsupplierDetails(id);
    });
  }

  loadsupplierDetails(id: number) {
    this.supplierService.getSupplierById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.supplier = response.supplier;
          this.parts = this.filteredparts = response.supplier.parts;
        }
      },
    });
  }

  toggleFavorite() {
    if (!this.authService.isloggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    const isFavorite = this.favoriteService.isSupplierFavorite(this.supplier.id);
    const request$ = isFavorite
      ? this.favoriteService.removeSupplier(this.supplier.id)
      : this.favoriteService.addSupplier(this.supplier.id);

    request$.subscribe({
      error: () => {
        console.error('Failed to toggle favorite');
      },
    });
  }
  isFavorite(id: any): boolean {
    return this.favoriteService.isSupplierFavorite(id);
  }

  filterParts(event: Event) {
    let keyword = (event.target as HTMLInputElement).value;
    this.filteredparts = this.parts.filter(
      (part) => part.nameAr.includes(keyword) || part.nameEn.includes(keyword),
    );
  }
}
