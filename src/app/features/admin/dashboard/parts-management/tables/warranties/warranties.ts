import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AddEditWarranty } from './add-edit-warranty/add-edit-warranty';
import { WarrantyType } from '../../../../../../core/models/lookups.model';
import { isPlatformBrowser } from '@angular/common';
import { AdminLookupsService } from '../../../../../../core/services/admin/admin.lookups.service';
import { LookupService } from '../../../../../../core/services/lookup.service';
import { DeleteModal } from '../../../../../../shared/delete-modal/delete-modal';

@Component({
  selector: 'app-warranties',
  imports: [AddEditWarranty, DeleteModal],
  templateUrl: './warranties.html',
  styleUrl: './warranties.css',
})
export class Warranties {
  private platform = inject(PLATFORM_ID);
  private lookupService = inject(LookupService);
  private adminService = inject(AdminLookupsService);

  warranties: WarrantyType[] = [];
  filteredWarranties: WarrantyType[] = [];

  openAddModalBool = false;
  openEditModalBool = false;
  openDeleteModalBool = false;

  selectedDeleteWarranty!: WarrantyType;
  selectedEditWarranty!: WarrantyType;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadWarranties();
    }
  }

  // ========================
  // Load Warranties
  // ========================
  loadWarranties() {
    this.lookupService.getWarrantyTypes().subscribe({
      next: (res) => {
        if (res.success) {
          this.warranties = res.data;
          this.filteredWarranties = this.warranties;
        }
      },
    });
  }

  // ========================
  // Modals
  // ========================
  toggleAddModal() {
    this.openAddModalBool = !this.openAddModalBool;
  }

  toggleEditModal() {
    this.openEditModalBool = !this.openEditModalBool;
  }

  toggleDeleteModal() {
    this.openDeleteModalBool = !this.openDeleteModalBool;
  }

  // ========================
  // Delete
  // ========================
  deleteWarranty(warranty: WarrantyType) {
    this.selectedDeleteWarranty = warranty;
    this.toggleDeleteModal();
  }

  confirmDelete() {
    this.adminService.deleteWarrantyType(this.selectedDeleteWarranty.id).subscribe({
      next: () => {
        this.toggleDeleteModal();
        this.loadWarranties();
      },
    });
  }

  // ========================
  // Edit
  // ========================
  editWarranty(warranty: WarrantyType) {
    this.selectedEditWarranty = warranty;
    this.toggleEditModal();
  }

  // ========================
  // Filter
  // ========================
  filterWarranties(keyword: string) {
    this.filteredWarranties = this.warranties.filter(
      (w) => w.nameAr.includes(keyword) || w.nameEn.includes(keyword),
    );
  }
}
