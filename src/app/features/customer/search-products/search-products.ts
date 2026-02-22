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
import { PartSearchParams, PartsSearchResponse } from '../model/parts.model';
import { LookupService } from '../../../core/services/lookup.service';
import {
  VehicleType,
  Make,
  City,
  PartCondition,
  WarrantyType,
  Subcategory,
  VehicleModel,
  Year,
} from '../../../core/models/lookups.model';
import { Part } from '../../../core/models/parts.model';
import { PartsServices } from '../../../core/services/parts.service';
import { LucideAngularModule, Annoyed } from 'lucide-angular';
import { ActivatedRoute } from '@angular/router';

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
    LucideAngularModule,
  ],
  templateUrl: './search-products.html',
  styleUrl: './search-products.css',
})
export class SearchProducts {
  //icon
  readonly Annoyed = Annoyed;
  //service
  private lookupsService = inject(LookupService);
  private partsService = inject(PartsServices);
  private route = inject(ActivatedRoute);

  // ================= params =================
  searchKey: string = '';
  subcategoryId?: number;
  subcategoryName?: string;
  // ================= Filters =================
  filters: PartSearchParams = {
    MinPrice: 20,
    MaxPrice: 7800,
    Page: 1,
    PageSize: 16,
  };
  products: Part[] = [];
  pagination!: PartsSearchResponse['pagination'];
  totalItems: number = 0;

  rangeValues: number[] = [this.filters.MinPrice ?? 0, this.filters.MaxPrice ?? 0];

  // ================= Lookups =================
  vehicleTypes: VehicleType[] = [];
  subCategories: Subcategory[] = [];
  makes: Make[] = [];
  models: VehicleModel[] = [];
  cities: City[] = [];
  conditions: PartCondition[] = [];
  warrantyTypes: WarrantyType[] = [];
  years: Year[] = [];

  // ================= Static =================
  boolOptions = [
    { label: 'نعم', value: true },
    { label: 'لا', value: false },
  ];
  // ================= header =================
  resultsHeader: string = '';
  resultsSummary: string = '';
  // ================= Lifecycle =================
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchKey = params['search'] || '';
      this.subcategoryId = params['subcategoryId'] ? +params['subcategoryId'] : undefined;
      this.subcategoryName = params['subcategoryName'] || '';

      // Prepare filters based on params
      this.filters = {
        Keyword: this.searchKey,
        VehicleSubcategoryId: this.subcategoryId,
      };

      // Update header dynamically
      this.updateHeader();

      this.search();
    });

    this.loadInitialLookups();
  }
  // ================= Loaders =================
  private loadInitialLookups() {
    this.lookupsService.getVehicleTypes().subscribe((res) => {
      this.vehicleTypes = res.data;
    });

    this.lookupsService.getCities().subscribe((res) => {
      this.cities = res.data;
    });

    this.lookupsService.getPartConditions().subscribe((res) => {
      this.conditions = res.data;
    });

    this.lookupsService.getWarrantyTypes().subscribe((res) => {
      this.warrantyTypes = res.data;
    });

    this.lookupsService.getYears().subscribe((res) => {
      this.years = res.data;
    });
  }

  // ================= Cascading Dropdowns =================
  onVehicleTypeChange(vehicleTypeId: number) {
    this.filters.VehicleTypeId = vehicleTypeId;
    if (vehicleTypeId) {
      this.lookupsService.getSubcategoriesByVehicleType(vehicleTypeId).subscribe((res) => {
        this.subCategories = res.data;
      });

      this.lookupsService.getMakesByVehicleType(vehicleTypeId).subscribe((res) => {
        this.makes = res.data;
      });
    } else {
      this.subCategories = [];
      this.makes = [];
    }
    this.models = [];
    this.filters.MakeId = undefined;
    this.filters.ModelId = undefined;
  }

  onMakeChange(makeId: number) {
    this.filters.MakeId = makeId;
    if (makeId) {
      this.lookupsService.getModelsByMake(makeId).subscribe((res) => (this.models = res.data));
    } else {
      this.models = [];
      this.filters.ModelId = undefined;
    }
  }
  // ===== Search =====
  search() {
    this.partsService.searchParts(this.filters).subscribe({
      next: (res) => {
        this.products = res.parts ?? [];
        this.pagination = res.pagination;
        this.totalItems = res.pagination?.totalItems;
        this.updateHeader();
      },
    });
  }

  // ================= Helpers =================
  onPriceChange() {
    this.filters.MinPrice = this.rangeValues[0];
    this.filters.MaxPrice = this.rangeValues[1];
  }

  applyFilters(): void {
    this.filters.Page = 1;
    this.search();
  }

  clearAll() {
    this.resetFilters();
    this.applyFilters();
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
    this.subCategories = [];
    this.makes = [];
    this.models = [];
  }
  onPageChange(page: number): void {
    this.filters.Page = page + 1;
    this.search();
  }
  private updateHeader() {
    if (this.subcategoryName) {
      this.resultsHeader = `نتائج البحث في "${this.subcategoryName}"`;
    } else if (this.searchKey) {
      this.resultsHeader = `نتائج البحث لـ "${this.searchKey}"`;
    } else {
      this.resultsHeader = 'نتائج البحث';
    }

    this.resultsSummary = `عرض ${this.products.length} من أصل ${this.totalItems} نتيجة`;
  }
}
