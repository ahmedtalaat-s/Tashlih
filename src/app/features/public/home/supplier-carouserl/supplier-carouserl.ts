import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';
import { Supplier } from '../../../../core/models/supplier.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { SupplierCard } from '../../../../shared/supplier-card/supplier-card';
@Component({
  selector: 'app-supplier-carouserl',
  imports: [LucideAngularModule, SupplierCard],
  templateUrl: './supplier-carouserl.html',
  styleUrl: './supplier-carouserl.css',
})
export class SupplierCarouserl {
  @ViewChild('carousel', { static: true })
  carousel!: ElementRef<HTMLDivElement>;

  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;

  @Input() suppliers!: Supplier[];

  scrollNext() {
    this.carousel.nativeElement.scrollBy({
      left: -300, // RTL
      behavior: 'smooth',
    });
  }

  scrollPrev() {
    this.carousel.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }
}
