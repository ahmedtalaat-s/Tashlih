import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProductCard } from '../../public/product/model/produtct';
import { ProductCard } from '../../public/product/product-card/product-card';
import { Pagination } from '../../../shared/pagination/pagination';
import { SliderModule } from 'primeng/slider';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { PartSearchParams } from '../model/parts.model';

export interface FilterOption {
  name: string;
  id: number | string | null;
}

@Component({
  selector: 'app-search-products',
  imports: [
    FormsModule,
    ProductCard,
    Pagination,
    SliderModule,
    SelectModule,
    RadioButtonModule,
    SelectButtonModule,
    InputTextModule,
  ],
  templateUrl: './search-products.html',
  styleUrl: './search-products.css',
})
export class SearchProducts {
  // main filter
  filters: PartSearchParams = {
    MinPrice: 1800,
    MaxPrice: 7800,
  };

  rangeValues: number[] = [this.filters.MinPrice ?? 0, this.filters.MaxPrice ?? 0];

  // 1. Dynamic Year Generation (Current Year down to 1980)
  years: number[] = Array.from(
    { length: new Date().getFullYear() - 1980 + 1 },
    (_, i) => new Date().getFullYear() - i,
  );

  // 2. Static Condition List (Maps to ConditionId)
  conditions: FilterOption[] = [
    { name: 'جديد', id: 1 },
    { name: 'مستعمل', id: 2 },
    { name: 'مجدد', id: 3 },
  ];

  // 3. Mock Data for Categories (Maps to CategoryId)
  categories: FilterOption[] = [
    { name: 'المحركات', id: 101 },
    { name: 'قطع غيار خارجية', id: 102 },
    { name: 'إكسسوارات', id: 103 },
    { name: 'كهرباء', id: 104 },
  ];

  // 4. Mock Data for Cities (Maps to CityId)
  cities: FilterOption[] = [
    { name: 'الرياض', id: 1 },
    { name: 'جدة', id: 2 },
    { name: 'الدمام', id: 3 },
    { name: 'مكة المكرمة', id: 4 },
    { name: 'المدينة المنورة', id: 5 },
  ];

  // 5. Vehicle Makes (Maps to MakeId)
  makes: FilterOption[] = [
    { name: 'تويوتا', id: 10 },
    { name: 'هوندا', id: 11 },
    { name: 'نيسان', id: 12 },
    { name: 'فورد', id: 13 },
    { name: 'هيونداي', id: 14 },
  ];

  // 6. Vehicle Models (This usually updates based on MakeId)
  models: FilterOption[] = [
    { name: 'كامري', id: 201 },
    { name: 'كورولا', id: 202 },
    { name: 'اكورد', id: 203 },
    { name: 'النترا', id: 204 },
  ];

  // 7. Vehicle Types (Maps to VehicleTypeId)
  types: FilterOption[] = [
    { name: 'سيدان', id: 1 },
    { name: 'دفع رباعي', id: 2 },
    { name: 'شاحنة', id: 3 },
  ];

  // 8.booloptions
  boolOptions = [
    { label: 'نعم', value: true },
    { label: 'لا', value: false },
  ];

  products = Array.from({ length: 16 });
  product: IProductCard = {
    id: 2,
    title: 'قير أوتوماتيك هيونداي',
    image: '',
    price: 200,
    currency: 'ر.س',
  };

  onPriceChange() {
    this.filters.MinPrice = this.rangeValues[0];
    this.filters.MaxPrice = this.rangeValues[1];
  }

  applyFilters() {}

  clearAll() {
    this.resetFilters();
    this.applyFilters(); // Refresh results
  }

  private resetFilters() {
    this.filters = {
      Keyword: '',
      MinPrice: 0,
      MaxPrice: 1000,
      HasWarranty: null,
      DeliveryAvailable: null,
    };
    this.rangeValues = [0, 1000];
  }
}
