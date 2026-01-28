import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeroCarousel } from './hero-carousel/hero-carousel';
import { IProductCard } from '../product/model/produtct';
import { ProductSection } from '../product/product-section/product-section';
import { Banner } from '../../../shared/banner/banner';
import { Categories } from './categories/categories';
import { SupplierCarouserl } from './supplier-carouserl/supplier-carouserl';
import { Map } from '../../location/components/map/map';
import { PartsServices } from '../../../core/services/parts.service';
import { Part } from '../../../core/models/parts.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { SupplierService } from '../../../core/services/supplier.service';
import { Supplier } from '../../../core/models/supplier.model';
import { Category } from '../../../core/models/categories.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeroCarousel, ProductSection, Banner, Categories, SupplierCarouserl, Map],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private partsService = inject(PartsServices);
  private suppliersService = inject(SupplierService);
  private platform = inject(PLATFORM_ID);
  Latest!: Part[];
  recommended!: Part[];
  suppliers: Supplier[] = [];
  categories!: Category[];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadLatestParts();
      this.loadSuppliers();
      this.loadCategoies();
    }

    // this.loadRecommendedParts();
  }
  private loadLatestParts() {
    this.partsService.getLatestParts(8).subscribe((response) => {
      this.Latest = response.parts;
    });
  }
  private loadRecommendedParts() {
    this.partsService.getFeaturedParts(10).subscribe((response) => {
      this.recommended = response.parts;
    });
  }

  loadSuppliers() {
    this.suppliersService.getSuppliersList('').subscribe((res) => {
      this.suppliers = res.suppliers;
    });
  }
  loadCategoies() {
    this.partsService.getPartCategories().subscribe((response) => {
      this.categories = this.shuffleArray(response.data).slice(0, 18);
    });
  }
  shuffleArray<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
