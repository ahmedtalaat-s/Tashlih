import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AddEditCity } from './add-edit-city/add-edit-city';
import { City } from '../../../../../../core/models/lookups.model';
import { isPlatformBrowser } from '@angular/common';
import { AdminLookupsService } from '../../../../../../core/services/admin/admin.lookups.service';
import { LookupService } from '../../../../../../core/services/lookup.service';
import { DeleteModal } from '../../../../../../shared/delete-modal/delete-modal';

@Component({
  selector: 'app-cities',
  imports: [AddEditCity, DeleteModal],
  templateUrl: './cities.html',
  styleUrl: './cities.css',
})
export class Cities {
  private platform = inject(PLATFORM_ID);
  private lookupService = inject(LookupService);
  private adminService = inject(AdminLookupsService);

  cities: City[] = [];
  filteredCities: City[] = [];

  openAddModalBool = false;
  openEditModalBool = false;
  openDeleteModalBool = false;

  selectedDeleteCity!: City;
  selectedEditCity!: City;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadCities();
    }
  }

  // ========================
  // Load Cities
  // ========================

  loadCities() {
    this.lookupService.getCities().subscribe({
      next: (res) => {
        if (res.success) {
          this.cities = res.data;
          this.filteredCities = this.cities;
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

  deleteCity(city: City) {
    this.selectedDeleteCity = city;
    this.toggledeleteModal();
  }

  confirmDelete() {
    this.adminService.deleteCity(this.selectedDeleteCity.id).subscribe({
      next: () => {
        this.toggledeleteModal();
        this.loadCities();
      },
    });
  }

  // ========================
  // Edit
  // ========================

  editCity(city: City) {
    this.selectedEditCity = city;
    this.toggleEditModal();
  }

  // ========================
  // Filter
  // ========================

  filterCities(keyword: string) {
    this.filteredCities = this.cities.filter(
      (c) => c.nameAr.includes(keyword) || c.nameEn.includes(keyword),
    );
  }
}
