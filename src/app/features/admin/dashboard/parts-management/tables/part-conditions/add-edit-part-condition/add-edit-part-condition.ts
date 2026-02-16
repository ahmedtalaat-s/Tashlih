import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminLookupsService } from '../../../../../../../core/services/admin/admin.lookups.service';

@Component({
  selector: 'app-add-edit-part-condition',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-part-condition.html',
  styleUrl: './add-edit-part-condition.css',
})
export class AddEditPartCondition {
  @Input() PartCondition: any | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  @Output() close = new EventEmitter<void>();
  @Output() submitCondition = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private adminService = inject(AdminLookupsService);

  conditionForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.PartCondition) {
      this.patchForm();
    }
  }

  initForm() {
    this.conditionForm = this.fb.group({
      nameAr: ['', [Validators.required, Validators.minLength(2)]],
      nameEn: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  patchForm() {
    this.conditionForm.patchValue({
      nameAr: this.PartCondition?.nameAr,
      nameEn: this.PartCondition?.nameEn,
    });
  }

  get f() {
    return this.conditionForm.controls;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.conditionForm.invalid) {
      this.conditionForm.markAllAsTouched();
      return;
    }

    const formValue = this.conditionForm.value;

    const payload = {
      key: this.generateDummyKey(),
      nameAr: formValue.nameAr,
      nameEn: formValue.nameEn,
    };

    if (this.mode === 'add') {
      this.addCondition(payload);
    } else {
      this.editCondition(payload);
    }
  }

  addCondition(data: { key: string; nameAr: string; nameEn: string }) {
    this.adminService.createPartCondition(data).subscribe({
      next: () => this.reset(),
    });
  }

  editCondition(data: { key: string; nameAr: string; nameEn: string }) {
    if (!this.PartCondition) return;

    this.adminService.updatePartCondition(this.PartCondition.id, data).subscribe({
      next: () => this.reset(),
    });
  }

  private generateDummyKey(): string {
    return 'COND_' + Date.now();
  }

  reset() {
    this.conditionForm.reset();
    this.submitCondition.emit();
    this.close.emit();
  }
}
