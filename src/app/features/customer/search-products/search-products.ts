import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProductCard } from '../../public/product/model/produtct';
import { ProductCard } from '../../public/product/product-card/product-card';
import { Pagination } from '../../../shared/pagination/pagination';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-search-products',
  imports: [FormsModule, ProductCard, Pagination, SliderModule],
  templateUrl: './search-products.html',
  styleUrl: './search-products.css',
})
export class SearchProducts {
  rangeValues: number[] = [800, 180];

  // ===== Slider values =====
  minValue = this.rangeValues[0];
  maxValue = this.rangeValues[1];

  products = Array.from({ length: 16 });
  product: IProductCard = {
    id: 2,
    title: 'قير أوتوماتيك هيونداي',
    image: '',
    price: 200,
    currency: 'ر.س',
  };

  onRangeChange() {
    this.minValue = this.rangeValues[0];
    this.maxValue = this.rangeValues[1];
    console.log(this.rangeValues);
  }
}
