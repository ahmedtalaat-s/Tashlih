import { Component, inject } from '@angular/core';
import { AdminCustomerService } from '../../../../core/services/admin/admin.customer.service';
import { LookupService } from '../../../../core/services/lookup.service';
import { Customer, CustomersResponse } from '../../../../core/models/admin.model';
import { firstValueFrom, map } from 'rxjs';
import { City } from '../../../../core/models/lookups.model';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmModal } from '../../../../shared/confirm-modal/confirm-modal';
import { DeleteModal } from '../../../../shared/delete-modal/delete-modal';
import { Pagination } from '../../../../shared/pagination/pagination';

@Component({
  selector: 'app-customer-management',
  imports: [Pagination, DatePipe, FormsModule, ConfirmModal, DeleteModal],
  templateUrl: './customer-management.html',
  styleUrl: './customer-management.css',
})
export class CustomerManagement {
  private lookups = inject(LookupService);
  private customerService = inject(AdminCustomerService);
  customers!: Customer[] | null;
  cities!: City[];
  query = {
    Page: 1,
    PageSize: 6,
    Search: '',
    Status: '',
    City: '',
  };
  pagination!: CustomersResponse['pagination'] | null;

  async ngOnInit() {
    this.searchCustomers();
    this.cities = await firstValueFrom(this.lookups.getCities().pipe(map((res) => res.data)));
  }

  // search suppliers
  searchCustomers() {
    console.log(this.query);

    this.customerService.getCustomers(this.query).subscribe({
      next: (res) => {
        this.customers = res.customers;
        this.pagination = res.pagination;
      },
    });
  }

  // handle page change
  onPageChange(page: number) {
    this.query.Page = page + 1;
    this.searchCustomers();
  }
  //
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
    this.customerService
      .activateCustomer(this.activteId, { reason: payload.reason, adminNotes: payload.adminNotes })
      .subscribe({
        next: (res) => {
          this.toggleactiveModal();
          this.searchCustomers();
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
    this.customerService
      .deactivateCustomer(this.deactivteId, {
        reason: payload.reason,
        adminNotes: payload.adminNotes,
      })
      .subscribe({
        next: (res) => {
          this.toggledeactiveModal();
          this.searchCustomers();
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
    this.customerService.deleteCustomer(this.deleteId).subscribe({
      next: (res) => {
        this.toggleDeleteModal();
        this.searchCustomers();
      },
    });
  }
}
