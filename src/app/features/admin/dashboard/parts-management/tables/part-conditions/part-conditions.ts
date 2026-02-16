import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AddEditPartCondition } from './add-edit-part-condition/add-edit-part-condition';
import { PartCondition } from '../../../../../../core/models/lookups.model';
import { isPlatformBrowser } from '@angular/common';
import { AdminLookupsService } from '../../../../../../core/services/admin/admin.lookups.service';
import { LookupService } from '../../../../../../core/services/lookup.service';
import { DeleteModal } from '../../../../../../shared/delete-modal/delete-modal';

@Component({
  selector: 'app-part-conditions',
  imports: [AddEditPartCondition, DeleteModal],
  templateUrl: './part-conditions.html',
  styleUrl: './part-conditions.css',
})
export class PartConditions {
  private platform = inject(PLATFORM_ID);
  private lookupService = inject(LookupService);
  private adminService = inject(AdminLookupsService);

  partConditions: PartCondition[] = [];
  filteredPartConditions: PartCondition[] = [];

  openAddModalBool = false;
  openEditModalBool = false;
  openDeleteModalBool = false;

  selectedDeletePartCondition!: PartCondition;
  selectedEditPartCondition!: PartCondition;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadPartConditions();
    }
  }

  // ========================
  // Load Part Conditions
  // ========================

  loadPartConditions() {
    this.lookupService.getPartConditions().subscribe({
      next: (res) => {
        if (res.success) {
          this.partConditions = res.data;
          this.filteredPartConditions = this.partConditions;
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

  deletePartCondition(condition: PartCondition) {
    this.selectedDeletePartCondition = condition;
    this.toggledeleteModal();
  }

  confirmDelete() {
    this.adminService.deletePartCondition(this.selectedDeletePartCondition.id).subscribe({
      next: () => {
        this.toggledeleteModal();
        this.loadPartConditions();
      },
    });
  }

  // ========================
  // Edit
  // ========================

  editPartCondition(condition: PartCondition) {
    this.selectedEditPartCondition = condition;
    this.toggleEditModal();
  }

  // ========================
  // Filter
  // ========================

  filterPartConditions(keyword: string) {
    this.filteredPartConditions = this.partConditions.filter(
      (c) => c.nameAr.includes(keyword) || c.nameEn.includes(keyword),
    );
  }
}
