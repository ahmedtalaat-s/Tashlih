import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminLookupsService } from '../../../../../../../core/services/admin/admin.lookups.service';
import { City } from '../../../../../../../core/models/lookups.model';

@Component({
  selector: 'app-add-edit-city',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-city.html',
  styleUrl: './add-edit-city.css',
})
export class AddEditCity {
  @Input() city: City | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  @Output() close = new EventEmitter<void>();
  @Output() submitCity = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private adminService = inject(AdminLookupsService);

  cityForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.city) {
      this.patchForm();
    }
  }

  initForm() {
    this.cityForm = this.fb.group({
      nameAr: ['', [Validators.required, Validators.minLength(2)]],
      nameEn: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  patchForm() {
    this.cityForm.patchValue({
      nameAr: this.city?.nameAr,
      nameEn: this.city?.nameEn,
    });
  }

  get f() {
    return this.cityForm.controls;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched();
      return;
    }

    const payload = this.cityForm.value;

    if (this.mode === 'add') {
      this.addCity(payload);
    } else {
      this.editCity(payload);
    }
  }

  addCity(data: City) {
    this.adminService.createCity(data).subscribe({
      next: () => this.reset(),
    });
  }

  editCity(data: City) {
    if (!this.city) return;

    this.adminService.updateCity(this.city.id, data).subscribe({
      next: () => this.reset(),
    });
  }

  reset() {
    this.cityForm.reset();
    this.submitCity.emit();
    this.close.emit();
  }
}
