import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminLookupsService } from '../../../../../../../core/services/admin/admin.lookups.service';
import { VehicleType } from '../../../../../../../core/models/lookups.model';

@Component({
  selector: 'app-add-edit-vehicles',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-vehicles.html',
  styleUrl: './add-edit-vehicles.css',
})
export class AddEditVehicles {
  @Input() vehicleType: VehicleType | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  @Output() close = new EventEmitter<void>();
  @Output() submitVehicleType = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private adminService = inject(AdminLookupsService);

  vehicleTypeForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.vehicleType) {
      this.patchForm();
    }
  }

  initForm() {
    this.vehicleTypeForm = this.fb.group({
      nameAr: ['', [Validators.required, Validators.minLength(2)]],
      nameEn: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  patchForm() {
    this.vehicleTypeForm.patchValue({
      nameAr: this.vehicleType?.nameAr,
      nameEn: this.vehicleType?.nameEn,
    });
  }

  get f() {
    return this.vehicleTypeForm.controls;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.vehicleTypeForm.invalid) {
      this.vehicleTypeForm.markAllAsTouched();
      return;
    }

    const payload = this.vehicleTypeForm.value;

    if (this.mode === 'add') {
      this.addVehicleType(payload);
    } else {
      this.editVehicleType(payload);
    }
  }

  addVehicleType(data: VehicleType) {
    this.adminService.createVehicleType(data).subscribe({
      next: () => this.reset(),
    });
  }

  editVehicleType(data: VehicleType) {
    if (!this.vehicleType) return;

    this.adminService.updateVehicleType(this.vehicleType.id, data).subscribe({
      next: () => this.reset(),
    });
  }

  reset() {
    this.vehicleTypeForm.reset();
    this.submitVehicleType.emit();
    this.close.emit();
  }
}
