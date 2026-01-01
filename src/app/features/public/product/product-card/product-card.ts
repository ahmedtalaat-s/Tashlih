import { Component, Input } from '@angular/core';
import { IProductCard } from '../model/produtct';
import { CurrencyPipe } from '@angular/common';
import { LucideAngularModule, Heart } from 'lucide-angular';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  readonly heart = Heart;

  @Input() product!: IProductCard;
}
