import { Component, Input } from '@angular/core';
import { IProductCard } from '../model/produtct';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-section',
  imports: [ProductCard],
  templateUrl: './product-section.html',
  styleUrl: './product-section.css',
})
export class ProductSection {
  @Input() title!: string;
  @Input() products: IProductCard[] = [];
}
