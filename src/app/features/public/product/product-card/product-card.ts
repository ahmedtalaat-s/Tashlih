import { Component, Input } from '@angular/core';
import { IProductCard } from '../model/produtct';
import { LucideAngularModule, Heart } from 'lucide-angular';
import { SaudiRiyalPipe } from '../../../../core/pipes/saudi-riyal-pipe';

@Component({
  selector: 'app-product-card',
  imports: [SaudiRiyalPipe, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  readonly heart = Heart;

  @Input() product!: IProductCard;
}
