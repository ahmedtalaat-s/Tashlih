import { Component, inject, PLATFORM_ID } from '@angular/core';
import { PaginationInfo, SupplierListItem } from '../../../../core/models/admin.model';
import { AdminSupplierService } from '../../../../core/services/admin/admin.supplier.service';
import { Pagination } from '../../../../shared/pagination/pagination';
import { DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-verification-requests',
  imports: [Pagination, DatePipe],
  templateUrl: './verification-requests.html',
  styleUrl: './verification-requests.css',
})
export class VerificationRequests {
  private platform = inject(PLATFORM_ID);
  private supplierService = inject(AdminSupplierService);

  suppliers!: SupplierListItem[];
  pagination!: PaginationInfo | null;
  page: number = 1;
  pageSize: number = 10;

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    if (isPlatformBrowser(this.platform)) {
      this.supplierService.getPendingSuppliers(this.page, this.pageSize).subscribe({
        next: (res) => {
          console.log(res);

          this.suppliers = res.suppliers;
          this.pagination = res.pagination;
        },
      });
    }
  }

  onPageChange(page: number) {
    this.page = page + 1;
    this.loadSuppliers();
  }
}
