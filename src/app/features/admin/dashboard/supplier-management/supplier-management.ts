import { Component, inject } from '@angular/core';
import { Pagination } from '../../../../shared/pagination/pagination';
import {
  GetSuppliersParams,
  GetSuppliersResponse,
  SupplierListItem,
} from '../../../../core/models/admin.model';
import { AdminSupplierService } from '../../../../core/services/admin/admin.supplier.service';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { City } from '../../../../core/models/lookups.model';
import { firstValueFrom, map } from 'rxjs';
import { LookupService } from '../../../../core/services/lookup.service';
import { ConfirmModal } from '../../../../shared/confirm-modal/confirm-modal';
import { DeleteModal } from '../../../../shared/delete-modal/delete-modal';

@Component({
  selector: 'app-supplier-management',
  imports: [Pagination, DatePipe, NgClass, FormsModule, ConfirmModal, DeleteModal],
  templateUrl: './supplier-management.html',
  styleUrl: './supplier-management.css',
})
export class SupplierManagement {
  private supplierService = inject(AdminSupplierService);
  private lookups = inject(LookupService);

  suppliers!: SupplierListItem[] | null;
  cities!: City[];
  query: GetSuppliersParams = {
    City: '',
    Page: 1,
    PageSize: 6,
    Search: '',
    Status: '',
    VerificationStatus: '',
  };
  pagination!: GetSuppliersResponse['pagination'] | null;

  async ngOnInit() {
    this.searchSuppliers();
    this.cities = await firstValueFrom(this.lookups.getCities().pipe(map((res) => res.data)));
  }

  // search suppliers
  searchSuppliers() {
    console.log(this.query);

    this.supplierService.getSuppliers(this.query).subscribe({
      next: (res) => {
        this.suppliers = res.suppliers;
        this.pagination = res.pagination;
      },
    });
  }

  // handle page change
  onPageChange(page: number) {
    this.query.Page = page + 1;
    this.searchSuppliers();
  }
  // helpers
  getVerification(status: string) {
    return status === 'approved' ? 'مقبول' : status === 'rejected' ? 'مرفوض' : 'منتظر المراجعة';
  }
  getClass(status: string) {
    return status === 'approved'
      ? 'badge-accepted'
      : status === 'rejected'
        ? 'badge-rejected'
        : 'badge-pending';
  }
  // modal helpers
  openactivemodalBool = false;
  toggleactiveModal() {
    this.openactivemodalBool = !this.openactivemodalBool;
  }
  opendeactivemodalBool = false;
  toggledeactiveModal() {
    this.opendeactivemodalBool = !this.opendeactivemodalBool;
  }
  openDeletemodalBool = false;
  toggleDeleteModal() {
    this.openDeletemodalBool = !this.openDeletemodalBool;
  }
  // confirm activate
  activteId: any;
  activate(id: any) {
    this.toggleactiveModal();
    this.activteId = id;
  }
  confirmActivate(payload: any) {
    console.log(payload);

    this.supplierService
      .activateSupplier(this.activteId, payload.reason, payload.adminNotes)
      .subscribe({
        next: (res) => {
          this.toggleactiveModal();
          this.searchSuppliers();
        },
      });
  }
  // confirm deactivate
  deactivteId: any;
  deactivate(id: any) {
    this.toggledeactiveModal();
    this.deactivteId = id;
  }
  confirmDeactivate(payload: { reason: string; adminNotes: string }) {
    this.supplierService
      .deactivateSupplier(this.deactivteId, payload.reason, payload.adminNotes)
      .subscribe({
        next: (res) => {
          this.toggledeactiveModal();
          this.searchSuppliers();
        },
      });
  }
  // confirm delete
  deleteId: any;
  delete(id: any) {
    this.toggleDeleteModal();
    this.deleteId = id;
  }
  confirmDelete() {
    this.supplierService.deleteSupplier(this.deleteId).subscribe({
      next: (res) => {
        this.toggleDeleteModal();
        this.searchSuppliers();
      },
    });
  }
}
