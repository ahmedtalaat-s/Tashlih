import { Component, inject, PLATFORM_ID } from '@angular/core';
import { VehicleType } from '../../../../../../core/models/lookups.model';
import { isPlatformBrowser } from '@angular/common';
import { AdminLookupsService } from '../../../../../../core/services/admin/admin.lookups.service';
import { DeleteModal } from '../../../../../../shared/delete-modal/delete-modal';
import { LookupService } from '../../../../../../core/services/lookup.service';
import { AddEditVehicles } from './add-edit-vehicles/add-edit-vehicles';

@Component({
  selector: 'app-vehicles',
  imports: [DeleteModal, AddEditVehicles],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css',
})
export class Vehicles {
  private platform = inject(PLATFORM_ID);
  private lookupService = inject(LookupService);
  private adminService = inject(AdminLookupsService);

  vehicles: VehicleType[] = [];
  filteredvehicles: VehicleType[] = [];
  openAddModalBool: boolean = false;
  openEditModalBool: boolean = false;
  openDeleteModalBool: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadVehicles();
    }
  }

  loadVehicles() {
    this.lookupService.getVehicleTypes().subscribe({
      next: (res) => {
        if (res.success) {
          this.vehicles = res.data;
          this.filteredvehicles = this.vehicles;
        }
      },
    });
  }
  // helpers for openning modals
  toggleAddModal() {
    this.openAddModalBool = !this.openAddModalBool;
  }
  toggleEditModal() {
    this.openEditModalBool = !this.openEditModalBool;
  }
  toggledeleteModal() {
    this.openDeleteModalBool = !this.openDeleteModalBool;
  }
  // delete a plan
  selectedDeleteVehicleType!: VehicleType;
  deleteVehicleType(VehicleType: VehicleType) {
    this.selectedDeleteVehicleType = VehicleType;
    this.toggledeleteModal();
  }
  confirmDelete() {
    this.adminService.deleteVehicleType(this.selectedDeleteVehicleType.id).subscribe({
      next: () => {
        this.toggledeleteModal();
        this.loadVehicles();
      },
    });
  }
  // edit a plan
  selectedEditVehicleType!: VehicleType;
  editVehicleType(VehicleType: VehicleType) {
    this.selectedEditVehicleType = VehicleType;
    this.toggleEditModal();
  }

  filterVehicleType(keyword: string) {
    this.filteredvehicles = this.vehicles.filter(
      (c) => c.nameAr.includes(keyword) || c.nameEn.includes(keyword),
    );
  }
}
