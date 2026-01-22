import { Component, computed, input, Input } from '@angular/core';
import { LucideAngularModule, Heart } from 'lucide-angular';
import { SaudiRiyalPipe } from '../../../../core/pipes/saudi-riyal-pipe';
import { Part, PartImage } from '../../../../core/models/parts.model';
@Component({
  selector: 'app-product-card',
  imports: [SaudiRiyalPipe, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  readonly heart = Heart;

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
}
