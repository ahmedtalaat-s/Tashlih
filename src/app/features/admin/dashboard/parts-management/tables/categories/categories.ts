import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AddEditCategory } from './add-edit-category/add-edit-category';
import { Category } from '../../../../../../core/models/lookups.model';
import { isPlatformBrowser } from '@angular/common';
import { AdminLookupsService } from '../../../../../../core/services/admin/admin.lookups.service';
import { PartsServices } from '../../../../../../core/services/parts.service';
import { DeleteModal } from '../../../../../../shared/delete-modal/delete-modal';

@Component({
  selector: 'app-categories',
  imports: [AddEditCategory, DeleteModal],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  private platform = inject(PLATFORM_ID);
  private partService = inject(PartsServices);
  private adminService = inject(AdminLookupsService);

  categories: Category[] = [];
  filteredCategories: Category[] = [];
  openAddModalBool: boolean = false;
  openEditModalBool: boolean = false;
  openDeleteModalBool: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadCategories();
    }
  }

  loadCategories() {
    this.partService.getPartCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data;
          this.filteredCategories = this.categories;
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
  selectedDeleteCategory!: Category;
  deleteCategory(Category: Category) {
    this.selectedDeleteCategory = Category;
    this.toggledeleteModal();
  }
  confirmDelete() {
    this.adminService.deleteCategory(this.selectedDeleteCategory.id).subscribe({
      next: () => {
        this.toggledeleteModal();
        this.loadCategories();
      },
    });
  }
  // edit a plan
  selectedEditCategory!: Category;
  editCategory(Category: Category) {
    this.selectedEditCategory = Category;
    this.toggleEditModal();
  }

  filterCategories(keyword: string) {
    this.filteredCategories = this.categories.filter(
      (c) => c.nameAr.includes(keyword) || c.nameEn.includes(keyword),
    );
  }
}
