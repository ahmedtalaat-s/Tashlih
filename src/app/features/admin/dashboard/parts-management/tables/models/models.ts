import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { VehicleModel, Make } from '../../../../../../core/models/lookups.model';
import { AdminLookupsService } from '../../../../../../core/services/admin/admin.lookups.service';
import { LookupService } from '../../../../../../core/services/lookup.service';
import { DeleteModal } from '../../../../../../shared/delete-modal/delete-modal';
import { AddEditModel } from './add-edit-model/add-edit-model';

@Component({
  selector: 'app-models',
  imports: [DeleteModal, AddEditModel],
  templateUrl: './models.html',
  styleUrl: './models.css',
})
export class Models {
  private platform = inject(PLATFORM_ID);
  private lookupService = inject(LookupService);
  private adminService = inject(AdminLookupsService);

  models: VehicleModel[] = [];
  filteredModels: VehicleModel[] = [];

  makes: Make[] = [];

  openAddModalBool = false;
  openEditModalBool = false;
  openDeleteModalBool = false;

  selectedDeleteModel!: VehicleModel;
  selectedEditModel!: VehicleModel;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadModels();
      this.loadMakes();
    }
  }

  // ========================
  // Load Models
  // ========================

  loadModels() {
    this.lookupService.getModels().subscribe({
      next: (res) => {
        if (res.success) {
          this.models = res.data;
          this.filteredModels = this.models;
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

  deleteModel(model: VehicleModel) {
    this.selectedDeleteModel = model;
    this.toggledeleteModal();
  }

  confirmDelete() {
    this.adminService.deleteModel(this.selectedDeleteModel.id).subscribe({
      next: () => {
        this.toggledeleteModal();
        this.loadModels();
      },
    });
  }

  // ========================
  // Edit
  // ========================

  editModel(model: VehicleModel) {
    this.selectedEditModel = model;
    this.toggleEditModal();
  }

  // ========================
  // Filter
  // ========================

  filterModels(keyword: string) {
    this.filteredModels = this.models.filter(
      (c) => c.nameAr.includes(keyword) || c.nameEn.includes(keyword),
    );
  }

  // ========================
  // Load Vehicle Types
  // ========================

  loadMakes() {
    this.lookupService.getMakes().subscribe({
      next: (res) => {
        if (res.success) {
          this.makes = res.data;
        }
      },
    });
  }
}
