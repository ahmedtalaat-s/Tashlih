import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminLookupsService } from '../../../../../../../core/services/admin/admin.lookups.service';
import { LookupService } from '../../../../../../../core/services/lookup.service';
import { VehicleType, Subcategory } from '../../../../../../../core/models/lookups.model';
@Component({
  selector: 'app-add-edit-subcategory',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-subcategory.html',
  styleUrl: './add-edit-subcategory.css',
})
export class AddEditSubcategory {
  @Input() subcategory: Subcategory | null = null;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() vehicleTypes: VehicleType[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() submitSubcategory = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private adminService = inject(AdminLookupsService);
  private lookupService = inject(LookupService);

  subcategoryForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.subcategory) {
      this.patchForm();
    }
  }

  initForm() {
    this.subcategoryForm = this.fb.group({
      nameAr: ['', [Validators.required, Validators.minLength(2)]],
      nameEn: ['', [Validators.required, Validators.minLength(2)]],
      vehicleTypeId: ['', Validators.required],
    });
  }

  patchForm() {
    this.subcategoryForm.patchValue({
      nameAr: this.subcategory?.nameAr,
      nameEn: this.subcategory?.nameEn,
      vehicleTypeId: this.subcategory?.vehicleTypeId,
    });
  }

  get f() {
    return this.subcategoryForm.controls;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.subcategoryForm.invalid) {
      this.subcategoryForm.markAllAsTouched();
      return;
    }

    const payload = this.subcategoryForm.value;

    if (this.mode === 'add') {
      this.addSubcategory(payload);
    } else {
      this.editSubcategory(payload);
    }
  }

  addSubcategory(data: Subcategory) {
    this.adminService.createSubCategory(data).subscribe({
      next: () => this.reset(),
    });
  }

  editSubcategory(data: Subcategory) {
    if (!this.subcategory) return;

    this.adminService.updateSubCategory(this.subcategory.id, data).subscribe({
      next: () => this.reset(),
    });
  }

  reset() {
    this.subcategoryForm.reset();
    this.submitSubcategory.emit();
    this.close.emit();
  }
}
