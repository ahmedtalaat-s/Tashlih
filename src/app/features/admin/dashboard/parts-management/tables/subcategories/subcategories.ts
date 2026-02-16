import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subcategory, VehicleType } from '../../../../../../core/models/lookups.model';
import { AdminLookupsService } from '../../../../../../core/services/admin/admin.lookups.service';
import { LookupService } from '../../../../../../core/services/lookup.service';
import { DeleteModal } from '../../../../../../shared/delete-modal/delete-modal';
import { AddEditSubcategory } from './add-edit-subcategory/add-edit-subcategory';
@Component({
  selector: 'app-subcategories',
  imports: [DeleteModal, AddEditSubcategory],
  templateUrl: './subcategories.html',
  styleUrl: './subcategories.css',
})
export class Subcategories {
  private platform = inject(PLATFORM_ID);
  private lookupService = inject(LookupService);
  private adminService = inject(AdminLookupsService);

  subcategories: Subcategory[] = [];
  filteredSubcategories: Subcategory[] = [];

  openAddModalBool = false;
  openEditModalBool = false;
  openDeleteModalBool = false;

  selectedDeleteSubcategory!: Subcategory;
  selectedEditSubcategory!: Subcategory;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadSubcategories();
      this.loadVehicleTypes();
    }
  }

  loadSubcategories() {
    this.lookupService.getSubcategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.subcategories = res.data;
          this.filteredSubcategories = this.subcategories;
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

  toggledeleteModal() {
    this.openDeleteModalBool = !this.openDeleteModalBool;
  }

  // ========================
  // Delete
  // ========================

  deleteSubcategory(subcategory: Subcategory) {
    this.selectedDeleteSubcategory = subcategory;
    this.toggledeleteModal();
  }

  confirmDelete() {
    this.adminService.deleteSubCategory(this.selectedDeleteSubcategory.id).subscribe({
      next: () => {
        this.toggledeleteModal();
        this.loadSubcategories();
      },
    });
  }

  // ========================
  // Edit
  // ========================

  editSubcategory(subcategory: Subcategory) {
    this.selectedEditSubcategory = subcategory;
    this.toggleEditModal();
  }

  // ========================
  // Filter
  // ========================

  filterSubcategories(keyword: string) {
    this.filteredSubcategories = this.subcategories.filter(
      (c) => c.nameAr.includes(keyword) || c.nameEn.includes(keyword),
    );
  }

  // load vehicles
  vehicleTypes: VehicleType[] = [];
  loadVehicleTypes() {
    this.lookupService.getVehicleTypes().subscribe({
      next: (res) => {
        if (res.success) {
          this.vehicleTypes = res.data;
        }
      },
    });
  }
}
