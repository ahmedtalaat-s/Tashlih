import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminLookupsService } from '../../../../../../../core/services/admin/admin.lookups.service';

@Component({
  selector: 'app-add-edit-year',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-year.html',
  styleUrl: './add-edit-year.css',
})
export class AddEditYear {
  @Input() Year: any | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  @Output() close = new EventEmitter<void>();
  @Output() submitYear = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private adminService = inject(AdminLookupsService);

  yearForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.Year) {
      this.patchForm();
    }
  }

  initForm() {
    this.yearForm = this.fb.group({
      year: [0, [Validators.required, Validators.min(0)]],
    });
  }

  patchForm() {
    this.yearForm.patchValue({
      year: this.Year?.year,
    });
  }

  get f() {
    return this.yearForm.controls;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.yearForm.invalid) {
      this.yearForm.markAllAsTouched();
      return;
    }

    const formValue = this.yearForm.value;

    const payload = {
      year: formValue.year,
    };

    if (this.mode === 'add') {
      this.addYear(payload);
    } else {
      this.editYear(payload);
    }
  }

  addYear(data: { year: number }) {
    this.adminService.createYear(data).subscribe({
      next: () => this.reset(),
    });
  }

  editYear(data: { year: number }) {
    if (!this.Year) return;

    this.adminService.updateYear(this.Year.id, data).subscribe({
      next: () => this.reset(),
    });
  }

  reset() {
    this.yearForm.reset();
    this.submitYear.emit();
    this.close.emit();
  }
}
