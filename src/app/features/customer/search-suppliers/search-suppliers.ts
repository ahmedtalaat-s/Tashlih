import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pagination } from '../../../shared/pagination/pagination';
import { SliderModule } from 'primeng/slider';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { LookupService } from '../../../core/services/lookup.service';
import { City } from '../../../core/models/lookups.model';
import { LucideAngularModule, Annoyed } from 'lucide-angular';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../../core/services/supplier.service';
import { Supplier, suppliersSearchResponse } from '../../../core/models/supplier.model';
import { SupplierCard } from '../../../shared/supplier-card/supplier-card';

@Component({
  selector: 'app-search-suppliers',
  imports: [
    FormsModule,
    SupplierCard,
    Pagination,
    SliderModule,
    SelectModule,
    RadioButtonModule,
    SelectButtonModule,
    InputTextModule,
    LucideAngularModule,
  ],
  templateUrl: './search-suppliers.html',
  styleUrl: './search-suppliers.css',
})
export class SearchSuppliers {
  //icon
  readonly Annoyed = Annoyed;
  //service
  private lookupsService = inject(LookupService);
  private suppierService = inject(SupplierService);
  private route = inject(ActivatedRoute);

  // ================= params =================
  searchKey: string = '';
  subcategoryId?: number;
  subcategoryName?: string;
  // ================= Filters =================
  filters = {
    Page: 1,
    PageSize: 6,
    Search: '',
    City: undefined,
  };
  suppliers: Supplier[] = [];
  pagination!: suppliersSearchResponse['pagination'];
  totalItems: number = 0;

  // ================= Lookups =================
  cities: City[] = [];

  resultsHeader: string = '';
  resultsSummary: string = '';
  // ================= Lifecycle =================
  ngOnInit(): void {
    this.updateHeader();

    this.search();

    this.loadInitialLookups();
  }
  // ================= Loaders =================
  private loadInitialLookups() {
    this.lookupsService.getCities().subscribe((res) => {
      this.cities = res.data;
    });
  }

  // ===== Search =====
  search() {
    this.suppierService.searchSuppliers(this.filters).subscribe({
      next: (res) => {
        this.suppliers = res.suppliers ?? [];
        this.pagination = res.pagination;
        this.totalItems = res.pagination?.totalItems;
        this.updateHeader();
      },
    });
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
    this.filters.Search = '';
  }
  onPageChange(page: number): void {
    this.filters.Page = page + 1;
    this.search();
  }
  private updateHeader() {
    this.resultsHeader = 'نتائج البحث';

    this.resultsSummary = `عرض ${this.suppliers.length} من أصل ${this.totalItems} نتيجة`;
  }
}
