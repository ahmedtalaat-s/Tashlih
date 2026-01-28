import { Component, inject, PLATFORM_ID } from '@angular/core';
import {
  LucideAngularModule,
  Heart,
  Share2,
  Image,
  Calendar,
  FileText,
  Wrench,
  Box,
  MessageCircle,
  Phone,
  ChevronLeft,
} from 'lucide-angular';
import { Part } from '../../../../core/models/parts.model';
import { PartsServices } from '../../../../core/services/parts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { SaudiRiyalPipe } from '../../../../core/pipes/saudi-riyal-pipe';
import { ProductCard } from '../product-card/product-card';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-product-details',
  imports: [LucideAngularModule, DatePipe, SaudiRiyalPipe, ProductCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  readonly HeartIcon = Heart;
  readonly ShareIcon = Share2;
  readonly ImageIcon = Image;
  readonly CalendarIcon = Calendar;
  readonly FileTextIcon = FileText;
  readonly WrenchIcon = Wrench;
  readonly BoxIcon = Box;
  readonly ChatIcon = MessageCircle;
  readonly PhoneIcon = Phone;
  readonly ChevronLeftIcon = ChevronLeft;

  private partsService = inject(PartsServices);
  private platform = inject(PLATFORM_ID);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private favoritesService = inject(FavoritesService);
  private authService = inject(AuthService);


  product!: Part;
  selectedImage?: string;
  relatedProducts: Part[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id && isPlatformBrowser(this.platform)) this.loadProductDetails(id);
    });
  }

  loadProductDetails(id: number) {
    this.partsService.getPartById(id).subscribe((res) => {
      this.product = res.part;
      this.selectedImage = this.product.primaryImageUrl;
      console.log(this.product);
      this.getRelatedProducts();
    });
  }
  selectImage(url: string) {
    this.selectedImage = url;
  }

  getRelatedProducts() {
    return this.partsService
      .getPartsBySupplierId(this.product.supplierId, 1, 9)
      .subscribe((res) => {
        this.relatedProducts = res.parts.filter((p) => p.id !== this.product.id).slice(0, 8);
      });
  }

  toggleFavorite() {
    if (!this.authService.isloggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    const isFavorite = this.favoritesService.isPartFavorite(this.product.id);
    const request$ = isFavorite
      ? this.favoritesService.removePart(this.product.id)
      : this.favoritesService.addPart(this.product.id);

    request$.subscribe({
      error: () => {
        console.error('Failed to toggle favorite');
      },
    });
  }
  isFavorite(id: any): boolean {
    return this.favoritesService.isPartFavorite(id);
  }
}
