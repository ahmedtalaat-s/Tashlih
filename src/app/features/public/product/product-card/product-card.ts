import { Component, computed, inject, input, Input } from '@angular/core';
import { LucideAngularModule, Heart } from 'lucide-angular';
import { SaudiRiyalPipe } from '../../../../core/pipes/saudi-riyal-pipe';
import { Part, PartImage } from '../../../../core/models/parts.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FavoritesService } from '../../../../core/services/favorites.service';
@Component({
  selector: 'app-product-card',
  imports: [SaudiRiyalPipe, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  readonly heart = Heart;
  private router = inject(Router);
  private authService = inject(AuthService);
  private favoritesService = inject(FavoritesService);

  // @input() product!: Part;
  product = input.required<Part>();
  defaultImage: PartImage = {
    id: 0,
    imageUrl: '/assets/images/engine.svg',
    thumbnailUrl: null,
    isPrimary: true,
    displayOrder: 0,
  };

  image = computed(() => {
    return this.product().images.find((img) => img.isPrimary) || this.defaultImage;
  });

  openProductDetail(productId: number) {
    this.router.navigate(['/details', productId]);
  }

  toggleFavorite() {
    if (!this.authService.isloggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    const isFavorite = this.favoritesService.isPartFavorite(this.product().id);
    const request$ = isFavorite
      ? this.favoritesService.removePart(this.product().id)
      : this.favoritesService.addPart(this.product().id);

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
