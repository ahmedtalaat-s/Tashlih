import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Calendar, LucideAngularModule, Wrench, X } from 'lucide-angular';
import { Pagination } from '../../../../shared/pagination/pagination';
import { FavoriteSupplier } from '../../../../core/models/supplier.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-favorites-suppliers-table',
  imports: [LucideAngularModule, Pagination, DatePipe],
  templateUrl: './favorites-suppliers-table.html',
  styleUrl: './favorites-suppliers-table.css',
})
export class FavoritesSuppliersTable implements OnChanges {
  readonly wrenchIcon = Wrench;
  readonly calendarIcon = Calendar;
  readonly xIcon = X;

  private router = inject(Router);

  @Input() data: FavoriteSupplier[] = [];
  @Input() totalCount: number = 0;
  @Input() search = '';
  @Output() delete = new EventEmitter<number>();

  paginatedSuppliers!: FavoriteSupplier[];
  filteredSuppliers!: FavoriteSupplier[];
  paginationIndex: number = 0;
  rowsPerPage = 5;
  currentPage = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['search']) {
      console.log(this.search);

      this.currentPage = 0;
      this.updatePaginatedSuppliers();
    }
  }
  updatePaginatedSuppliers() {
    this.filteredSuppliers = this.search
      ? this.data.filter((supplier) =>
          supplier.supplierName.toLowerCase().includes(this.search.toLowerCase()),
        )
      : [...this.data];
    const startIndex = this.currentPage * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;

    this.paginatedSuppliers = this.filteredSuppliers.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedSuppliers();
  }

  navigateToSupplier(id: any) {
    this.router.navigate(['/customer/supplier-profile', id]);
  }
}
