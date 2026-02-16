import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AddEditYear } from './add-edit-year/add-edit-year';
import { Year } from '../../../../../../core/models/lookups.model';
import { isPlatformBrowser } from '@angular/common';
import { AdminLookupsService } from '../../../../../../core/services/admin/admin.lookups.service';
import { LookupService } from '../../../../../../core/services/lookup.service';
import { DeleteModal } from '../../../../../../shared/delete-modal/delete-modal';

@Component({
  selector: 'app-years',
  imports: [AddEditYear, DeleteModal],
  templateUrl: './years.html',
  styleUrl: './years.css',
})
export class Years {
  private platform = inject(PLATFORM_ID);
  private lookupService = inject(LookupService);
  private adminService = inject(AdminLookupsService);

  years: Year[] = [];
  filteredYears: Year[] = [];

  openAddModalBool = false;
  openEditModalBool = false;
  openDeleteModalBool = false;

  selectedDeleteYear!: Year;
  selectedEditYear!: Year;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadYears();
    }
  }

  // ========================
  // Load Years
  // ========================
  loadYears() {
    this.lookupService.getYears().subscribe({
      next: (res) => {
        if (res.success) {
          this.years = res.data;
          this.filteredYears = this.years;
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
  deleteYear(year: Year) {
    this.selectedDeleteYear = year;
    this.toggleDeleteModal();
  }

  confirmDelete() {
    this.adminService.deleteYear(this.selectedDeleteYear.id).subscribe({
      next: () => {
        this.toggleDeleteModal();
        this.loadYears();
      },
    });
  }

  // ========================
  // Edit
  // ========================
  editYear(year: Year) {
    this.selectedEditYear = year;
    this.toggleEditModal();
  }

  // ========================
  // Filter
  // ========================
  filterYears(keyword: string) {
    this.filteredYears = this.years.filter((y) => y.year.toString().includes(keyword));
  }
}
