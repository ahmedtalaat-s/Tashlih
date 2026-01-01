import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  LucideAngularModule,
  Heart,
  Image,
  Phone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-angular';
@Component({
  selector: 'app-supplier-carouserl',
  imports: [LucideAngularModule],
  templateUrl: './supplier-carouserl.html',
  styleUrl: './supplier-carouserl.css',
})
export class SupplierCarouserl {
  @ViewChild('carousel', { static: true })
  carousel!: ElementRef<HTMLDivElement>;

  readonly HeartIcon = Heart;
  readonly ImageIcon = Image;
  readonly PhoneIcon = Phone;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;

  items = [1, 2, 3, 4, 5, 6, 8, 7];

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
