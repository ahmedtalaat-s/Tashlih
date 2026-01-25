import { Component, inject, OnInit } from '@angular/core';
import { HeroCarousel } from './hero-carousel/hero-carousel';
import { IProductCard } from '../product/model/produtct';
import { ProductSection } from '../product/product-section/product-section';
import { Banner } from '../../../shared/banner/banner';
import { Categories } from './categories/categories';
import { SupplierCarouserl } from './supplier-carouserl/supplier-carouserl';
import { Map } from '../../location/components/map/map';
import { PartsServices } from '../../../core/services/parts.service';
import { Part } from '../../../core/models/parts.model';

@Component({
  selector: 'app-home',
  imports: [HeroCarousel, ProductSection, Banner, Categories, SupplierCarouserl, Map],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private partsService = inject(PartsServices);

  Latest!: Part[];
  recommended!: Part[];

  ngOnInit(): void {
    this.loadLatestParts();
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
}
