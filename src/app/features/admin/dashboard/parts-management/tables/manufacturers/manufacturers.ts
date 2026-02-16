import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Make, VehicleType } from '../../../../../../core/models/lookups.model';
import { AdminLookupsService } from '../../../../../../core/services/admin/admin.lookups.service';
import { LookupService } from '../../../../../../core/services/lookup.service';
import { DeleteModal } from '../../../../../../shared/delete-modal/delete-modal';
import { AddEditManufacturer } from './add-edit-manufacturer/add-edit-manufacturer';

@Component({
  selector: 'app-manufacturers',
  imports: [DeleteModal, AddEditManufacturer],
  templateUrl: './manufacturers.html',
  styleUrl: './manufacturers.css',
})
export class Manufacturers {
  private platform = inject(PLATFORM_ID);
  private lookupService = inject(LookupService);
  private adminService = inject(AdminLookupsService);

  manufacturers: Make[] = [];
  filteredManufacturers: Make[] = [];

  vehicleTypes: VehicleType[] = [];

  openAddModalBool = false;
  openEditModalBool = false;
  openDeleteModalBool = false;

  selectedDeleteManufacturer!: Make;
  selectedEditManufacturer!: Make;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadManufacturers();
      this.loadVehicleTypes();
    }
  }

  // ========================
  // Load Manufacturers (Makes)
  // ========================

  loadManufacturers() {
    this.lookupService.getMakes().subscribe({
      next: (res) => {
        if (res.success) {
          this.manufacturers = res.data;
          this.filteredManufacturers = this.manufacturers;
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

  deleteManufacturer(manufacturer: Make) {
    this.selectedDeleteManufacturer = manufacturer;
    this.toggledeleteModal();
  }

  confirmDelete() {
    this.adminService.deleteMake(this.selectedDeleteManufacturer.id).subscribe({
      next: () => {
        this.toggledeleteModal();
        this.loadManufacturers();
      },
    });
  }

  // ========================
  // Edit
  // ========================

  editManufacturer(manufacturer: Make) {
    this.selectedEditManufacturer = manufacturer;
    this.toggleEditModal();
  }

  // ========================
  // Filter
  // ========================

  filterManufacturers(keyword: string) {
    this.filteredManufacturers = this.manufacturers.filter(
      (c) => c.nameAr.includes(keyword) || c.nameEn.includes(keyword),
    );
  }

  // ========================
  // Load Vehicle Types (needed for relation)
  // ========================

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
