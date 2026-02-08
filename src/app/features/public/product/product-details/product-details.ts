import { Component, inject, PLATFORM_ID } from '@angular/core';
import {
  LucideAngularModule,
  Heart,
  Share2,
  Image,
  Calendar,
  FileText,
  Wrench,
  Box,
  MessageCircle,
  Phone,
  ChevronLeft,
  TagIcon,
  InfoIcon,
  CarIcon,
  CircleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
  HashIcon,
  MenuIcon,
  StoreIcon,
  PlaneTakeoff,
  XIcon,
  PlusIcon,
  MinusIcon,
  ListIcon,
} from 'lucide-angular';
import { Part } from '../../../../core/models/parts.model';
import { PartsServices } from '../../../../core/services/parts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { SaudiRiyalPipe } from '../../../../core/pipes/saudi-riyal-pipe';
import { ProductCard } from '../product-card/product-card';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CustomerOrdersService } from '../../../../core/services/customer-orders.service';
import { createOrderRequest } from '../../../../core/models/customerOrders.model';
import { ToastService } from '../../../../core/services/toast.service';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-product-details',
  imports: [LucideAngularModule, DatePipe, SaudiRiyalPipe, ProductCard, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  readonly HeartIcon = Heart;
  readonly ShareIcon = Share2;
  readonly ImageIcon = Image;
  readonly CalendarIcon = Calendar;
  readonly FileTextIcon = FileText;
  readonly WrenchIcon = Wrench;
  readonly BoxIcon = Box;
  readonly ChatIcon = MessageCircle;
  readonly PhoneIcon = Phone;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly TagIcon = TagIcon;
  readonly InfoIcon = InfoIcon;
  readonly CarIcon = CarIcon;
  readonly CircleIcon = CircleIcon;
  readonly CheckCircleIcon = CheckCircleIcon;
  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly TruckIcon = TruckIcon;
  readonly HashIcon = HashIcon;
  readonly MenuIcon = MenuIcon;
  readonly StoreIcon = StoreIcon;
  readonly PlaneTakeoff = PlaneTakeoff;
  readonly XIcon = XIcon;
  readonly PlusIcon = PlusIcon;
  readonly MinusIcon = MinusIcon;
  readonly ListIcon = ListIcon;

  private partsService = inject(PartsServices);
  private platform = inject(PLATFORM_ID);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private favoritesService = inject(FavoritesService);
  private authService = inject(AuthService);
  private orderService = inject(CustomerOrdersService);
  private toatsService = inject(ToastService);
  private language = inject(LanguageService);

  product!: Part;
  selectedImage?: string;
  relatedProducts: Part[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id && isPlatformBrowser(this.platform)) this.loadProductDetails(id);
    });
  }

  loadProductDetails(id: number) {
    this.partsService.getPartById(id).subscribe((res) => {
      this.product = res.part;
      this.selectedImage = this.product.primaryImageUrl;
      console.log(this.product);
      this.getRelatedProducts();
    });
  }
  selectImage(url: string) {
    this.selectedImage = url;
  }

  getRelatedProducts() {
    return this.partsService
      .getPartsBySupplierId(this.product.supplierId, 1, 9)
      .subscribe((res) => {
        this.relatedProducts = res.parts.filter((p) => p.id !== this.product.id).slice(0, 8);
      });
  }

  toggleFavorite() {
    if (!this.authService.isloggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    const isFavorite = this.favoritesService.isPartFavorite(this.product.id);
    const request$ = isFavorite
      ? this.favoritesService.removePart(this.product.id)
      : this.favoritesService.addPart(this.product.id);

    request$.subscribe({
      error: () => {
        console.error('Failed to toggle favorite');
      },
    });
  }
  isFavorite(id: any): boolean {
    return this.favoritesService.isPartFavorite(id);
  }

  //handle order
  isOrderModalOpen = false;
  orderQuantity = 1;
  customerNotes: string = '';

  openOrderModal() {
    if (isPlatformBrowser(this.platform) && this.authService.isloggedIn()) {
      this.orderQuantity = 1;
      this.isOrderModalOpen = true;
    } else if (isPlatformBrowser(this.platform) && !this.authService.isloggedIn()) {
      this.router.navigate(['/auth/login']);
    }
  }

  closeOrderModal() {
    this.isOrderModalOpen = false;
  }

  increaseQty() {
    if (this.orderQuantity < this.product.quantity) {
      this.orderQuantity++;
    }
  }

  decreaseQty() {
    if (this.orderQuantity > 1) {
      this.orderQuantity--;
    }
  }

  confirmOrder() {
    const order: createOrderRequest = {
      partId: this.product.id,
      quantity: this.orderQuantity,
      customerNotes: this.customerNotes,
    };

    this.orderService.createOrder(order).subscribe({
      next: (res) => {
        if (res.success) {
          this.language.defaultLanguage() == 'ar'
            ? this.toatsService.success('نجاح', res.messageAr ?? '')
            : this.toatsService.success('Success', res.message ?? '');
        }
      },
    });

    this.closeOrderModal();
  }
}
