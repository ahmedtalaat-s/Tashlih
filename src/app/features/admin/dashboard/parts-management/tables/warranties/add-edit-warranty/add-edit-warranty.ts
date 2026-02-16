import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminLookupsService } from '../../../../../../../core/services/admin/admin.lookups.service';
import { WarrantyType } from '../../../../../../../core/models/lookups.model';

@Component({
  selector: 'app-add-edit-warranty',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-warranty.html',
  styleUrl: './add-edit-warranty.css',
})
export class AddEditWarranty {
  @Input() Warranty: WarrantyType | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  @Output() close = new EventEmitter<void>();
  @Output() submitWarranty = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private adminService = inject(AdminLookupsService);

  warrantyForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.Warranty) {
      this.patchForm();
    }
  }

  initForm() {
    this.warrantyForm = this.fb.group({
      nameAr: ['', [Validators.required, Validators.minLength(2)]],
      nameEn: ['', [Validators.required, Validators.minLength(2)]],
      days: [0, [Validators.required, Validators.min(1)]],
    });
  }

  patchForm() {
    this.warrantyForm.patchValue({
      nameAr: this.Warranty?.nameAr,
      nameEn: this.Warranty?.nameEn,
      days: 0,
    });
  }

  get f() {
    return this.warrantyForm.controls;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.warrantyForm.invalid) {
      this.warrantyForm.markAllAsTouched();
      return;
    }

    const formValue = this.warrantyForm.value;

    const payload = {
      key: this.generateDummyKey(),
      nameAr: formValue.nameAr,
      nameEn: formValue.nameEn,
      days: formValue.days,
    };

    if (this.mode === 'add') {
      this.addWarranty(payload);
    } else {
      this.editWarranty(payload);
    }
  }

  addWarranty(data: { key: string; nameAr: string; nameEn: string; days: number }) {
    this.adminService.createWarrantyType(data).subscribe({
      next: () => this.reset(),
    });
  }

  editWarranty(data: { key: string; nameAr: string; nameEn: string; days: number }) {
    if (!this.Warranty) return;

    this.adminService.updateWarrantyType(this.Warranty.id, data).subscribe({
      next: () => this.reset(),
    });
  }

  private generateDummyKey(): string {
    return 'WAR_' + Date.now();
  }

  reset() {
    this.warrantyForm.reset();
    this.submitWarranty.emit();
    this.close.emit();
  }
}
