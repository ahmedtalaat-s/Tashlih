import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminLookupsService } from '../../../../../../../core/services/admin/admin.lookups.service';
import { Make, VehicleType } from '../../../../../../../core/models/lookups.model';

@Component({
  selector: 'app-add-edit-manufacturer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-manufacturer.html',
  styleUrl: './add-edit-manufacturer.css',
})
export class AddEditManufacturer {
  @Input() manufacturer: Make | null = null;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() vehicleTypes: VehicleType[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() submitManufacturer = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private adminService = inject(AdminLookupsService);

  manufacturerForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.manufacturer) {
      this.patchForm();
    }
  }

  initForm() {
    this.manufacturerForm = this.fb.group({
      nameAr: ['', [Validators.required, Validators.minLength(2)]],
      nameEn: ['', [Validators.required, Validators.minLength(2)]],
      vehicleTypeId: ['', Validators.required],
    });
  }

  patchForm() {
    this.manufacturerForm.patchValue({
      nameAr: this.manufacturer?.nameAr,
      nameEn: this.manufacturer?.nameEn,
      vehicleTypeId: this.manufacturer?.vehicleTypeId,
    });
  }

  get f() {
    return this.manufacturerForm.controls;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.manufacturerForm.invalid) {
      this.manufacturerForm.markAllAsTouched();
      return;
    }

    const payload = this.manufacturerForm.value;

    if (this.mode === 'add') {
      this.addManufacturer(payload);
    } else {
      this.editManufacturer(payload);
    }
  }

  addManufacturer(data: Make) {
    this.adminService.createMake(data).subscribe({
      next: () => this.reset(),
    });
  }

  editManufacturer(data: Make) {
    if (!this.manufacturer) return;

    this.adminService.updateMake(this.manufacturer.id, data).subscribe({
      next: () => this.reset(),
    });
  }

  reset() {
    this.manufacturerForm.reset();
    this.submitManufacturer.emit();
    this.close.emit();
  }
}
